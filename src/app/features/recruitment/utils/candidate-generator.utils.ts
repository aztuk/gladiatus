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
  if (Math.random() < config.allowTraitChance) {
    const def = randomFromArray(traitPool);
    trait = {
      traitId: def.id,
      remaining: def.duration
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

  const score = computeRarityScore(candidate, config);
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

function computeRarityScore(candidate: GladiatorCandidate, config: RecruitmentConfig): number {
  const baseStatsScore = Object.entries(candidate.baseStats).reduce((total, [key, value]) => {
    const [min, max] = config.baseStatsBounds[key as BaseStat];
    const normalized = normalize(value ?? 0, min, max);
    return total + normalized;
  }, 0) / Object.keys(config.baseStatsBounds).length;

  const skillScore = Object.entries(candidate.weaponSkills).reduce((total, [key, value]) => {
    const [min, max] = config.weaponSkillBounds[key as WeaponSkill];
    const normalized = normalize(value ?? 0, min, max);
    return total + normalized;
  }, 0) / Object.keys(config.weaponSkillBounds).length;

  const virtusScore = normalize(candidate.virtus, 1.0, 1.5);
  const traitScore = candidate.trait ? 1 : 0;

  console.log('baseStats', baseStatsScore);
  console.log('skillScore', skillScore);
  console.log('virtusScore', virtusScore);
  console.log('traitScore', traitScore);

  return (
    baseStatsScore * 40 +
    skillScore * 20 +
    virtusScore * 20 +
    traitScore * 20
  );
}

function computeRarity(score: number, config: RecruitmentConfig): string {
  // Convertit l’objet en tableau trié par seuil croissant
  const thresholds = Object.entries(config.rarityThresholds)
    .sort(([, a], [, b]) => a - b); // ex: [ ['trash', 0], ['common', 25], ...]

  let result = thresholds[0][0]; // fallback : le plus bas niveau

  for (const [rarity, threshold] of thresholds) {
    if (score >= threshold) {
      result = rarity;
    } else {
      break;
    }
  }

  return result;
}


function normalize(value: number, min: number, max: number): number {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
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
