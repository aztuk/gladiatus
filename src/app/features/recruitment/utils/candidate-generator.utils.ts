/**
 * Génère un candidat gladiateur en suivant les données et règles fournies :
 * - nom par origine
 * - stats par range fixe
 * - traits depuis le vrai pool
 */

import { v4 as uuid } from 'uuid';
import {
  GladiatorCandidate,
  Origine,
  WeaponSkill,
  BaseStat
} from '../../../core/models/gladiator.model';
import { RecruitmentConfig } from '../../../core/models/json/recruitment-config.model';
import { GladiatorPoolData } from '../../../core/models/json/gladiator-pool.model';
import { NamePool } from '../../../core/models/json/name-pool.model';
import { TraitDefinition } from '../../../core/models/json/trait-pool.model';
import { TraitInstance } from '../../../core/models/trait.model';

export function generateGladiatorCandidate(
  config: RecruitmentConfig,
  pool: GladiatorPoolData,
  namePool: NamePool,
  traitPool: TraitDefinition[]
): GladiatorCandidate {
  const origine = randomFromArray(pool.origines);
  const name = randomFromArray(namePool[origine] ?? ['Inconnu']);
  const virtus = parseFloat(randomInRange(pool.virtusRange[0], pool.virtusRange[1]).toFixed(2));
  const avatarId = randomInt(1, 8);

  const weaponSkills: Partial<Record<WeaponSkill, number>> = {};
  for (const key of Object.keys(pool.skills) as WeaponSkill[]) {
    const [min, max] = config.weaponSkillBounds[key];
    weaponSkills[key] = randomInt(min, max);
  }

  const baseStats: Partial<Record<BaseStat, number>> = generateBaseStats(config);

  let trait: TraitInstance | undefined;
  let traitDef: TraitDefinition | undefined;

  if (Math.random() < config.allowTraitChance) {
    traitDef = randomFromArray(traitPool);
    trait = {
      traitId: traitDef.id,
      remaining: traitDef.duration
    };
  }

  const candidate: GladiatorCandidate = {
    id: uuid(),
    avatarId,
    name,
    origine,
    baseStats,
    weaponSkills,
    trait,
    virtus,
    rarity: 'common',
    cost: 0
  };

  const score = computeRarityScoreV2(candidate, config, traitDef);
  candidate.rarity = computeRarity(score, config);
  candidate.cost = Math.round(score * config.goldPerScorePoint);

  return candidate;
}

function generateBaseStats(config: RecruitmentConfig): Partial<Record<BaseStat, number>> {
  const stats: Partial<Record<BaseStat, number>> = {};
  for (const stat of Object.values(BaseStat)) {
    const [min, max] = config.baseStatsBounds[stat];
    stats[stat] = randomInt(min, max);
  }
  return stats;
}

/**
 * Calcule le score de rareté pondéré et non-linéaire
 */
export function computeRarityScoreV2(
  candidate: GladiatorCandidate,
  config: RecruitmentConfig,
  traitDef?: TraitDefinition
): number {
  const baseStatWeights: Record<string, number> = {
    precision: 1.5,
    vitesse: 1.3,
    attack: 1.2,
    defense: 1.2,
    critical: 1.0,
    spectaculaire: 0.8
  };

  const totalWeight = Object.values(baseStatWeights).reduce((a, b) => a + b, 0);
  const baseStatsScore = Object.entries(candidate.baseStats).reduce((total, [key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(config.baseStatsBounds, key)) return total;
    const [min, max] = config.baseStatsBounds[key as BaseStat];
    const weight = baseStatWeights[key] ?? 1;
    const score = nonlinearNormalize(value ?? 0, min, max) * weight;
    return total + score;
  }, 0) / totalWeight;

  const bestWeaponScore = Object.entries(candidate.weaponSkills).reduce((best, [key, value]) => {
    if (!Object.prototype.hasOwnProperty.call(config.weaponSkillBounds, key)) return best;
    const [min, max] = config.weaponSkillBounds[key as WeaponSkill];
    const score = nonlinearNormalize(value ?? 0, min, max);
    return Math.max(best, score);
  }, 0);

  const virtusScore = nonlinearNormalize(candidate.virtus, 1.0, 1.5);
  const traitScore = computeTraitScore(traitDef);

  // -------------------
  console.log('--- Rarity Score Debug ---');

// Base stats détaillées
for (const [key, value] of Object.entries(candidate.baseStats)) {
  if (!Object.prototype.hasOwnProperty.call(config.baseStatsBounds, key)) continue;
  const [min, max] = config.baseStatsBounds[key as BaseStat];
  const weight = baseStatWeights[key] ?? 1;
  const norm = nonlinearNormalize(value ?? 0, min, max);
  console.log(`BaseStat ${key.padEnd(14)} → value: ${value}, norm: ${norm.toFixed(2)}, weighted: ${(norm * weight).toFixed(2)}`);
}
console.log(`→ BaseStats Score (global) : ${(baseStatsScore * 30).toFixed(2)}`);

// Arme
console.log(`→ Best Weapon Score        : ${(bestWeaponScore * 15).toFixed(2)}`);

// Virtus
console.log(`→ Virtus ${candidate.virtus} → Score: ${(virtusScore * 40).toFixed(2)}`);

// Trait
if (traitDef) {
  console.log(`→ Trait "${traitDef.label}" → Score: ${(traitScore * 15).toFixed(2)}`);
} else {
  console.log(`→ No trait`);
}

console.log(`→ Total rarity score       : ${(
  baseStatsScore * 30 +
  bestWeaponScore * 15 +
  virtusScore * 40 +
  traitScore * 15
).toFixed(2)}`);
console.log('---------------------------');


//---------------

  return (
    baseStatsScore * 30 +
    bestWeaponScore * 15 +
    virtusScore * 40 +
    traitScore * 15
  );
}

/**
 * Retourne la valeur totale d’un trait selon ses effets (positif ou négatif)
 */
function computeTraitScore(trait: TraitDefinition | undefined): number {
  if (!trait) return 0;
  let score = 0;
  for (const value of Object.values(trait.effect)) {
    if (!value) continue;
    score += value;
  }
  return score / 10;
}

function computeRarity(score: number, config: RecruitmentConfig): string {
  const thresholds = Object.entries(config.rarityThresholds).sort(([, a], [, b]) => a - b);
  let result = thresholds[0][0];
  for (const [rarity, threshold] of thresholds) {
    if (score >= threshold) {
      result = rarity;
    } else {
      break;
    }
  }
  return result;
}

/**
 * Normalisation non-linéaire (exponentielle douce)
 */
function nonlinearNormalize(value: number, min: number, max: number): number {
  const normalized = (value - min) / (max - min);
  return Math.pow(Math.max(0, Math.min(1, normalized)), 1.5);
}

// === Helpers ===

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
