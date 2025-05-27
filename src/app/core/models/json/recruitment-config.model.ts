/**
 * Décrit la structure du fichier `recruitment.config.json`.
 * Utilisé pour configurer les règles de recrutement procédural.
 */

import { BaseStat, WeaponSkill } from "../gladiator.model";

export type GladiatorRarity = 'common' | 'rare' | 'epic';

export interface RecruitmentConfig {
  /** Coût de base d’un gladiateur avant modification par sa rareté */
  gladiatorBaseCost: number;

  /** Nombre de profils proposés à chaque tirage */
  profilesPerDraw: number;

  /** Probabilité d’avoir un trait aléatoire (0 à 1) */
  allowTraitChance: number;

  /* Utilisé pour le calcul du prix */
  goldPerScorePoint: number;

  /** Range de random sur les base stats */
  baseStatsBounds: Record<BaseStat, [number, number]>;

  /** Range de random sur les armes */
  weaponSkillBounds: Record<WeaponSkill, [number, number]>;

  /** Seuil pour déterminer la rareté */
  rarityThresholds: {
    mediocre: number;
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
}


