/**
 * Structure des données chargées depuis `gladiator-pool.json`.
 * Ce fichier est utilisé pour la génération procédurale des profils de gladiateurs.
 */

import { Origine, WeaponSkill } from "../gladiator.model";

/**
 * Intervalle de compétence (par exemple : [1, 3]).
 */
export type SkillRange = [number, number];

/**
 * Définition d’un trait disponible au recrutement (référence à un ID de `trait-pool.json`).
 */
export interface TraitSummary {
  id: string;
  rarity: 'common' | 'rare' | 'epic';
}

/**
 * Structure complète du fichier `gladiator-pool.json`.
 */
export interface GladiatorPoolData {
  origines: Origine[]; // Correspond à l’enum Origine
  prenoms: string[];
  skills: Record<WeaponSkill, SkillRange>;
  traits: TraitSummary[];
  rarityChances: {
    common: number;
    rare: number;
    epic: number;
  };
  virtusRange: [number, number];
}
