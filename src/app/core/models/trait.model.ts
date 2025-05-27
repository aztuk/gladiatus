/**
 * Ce fichier définit la structure des traits appliqués aux gladiateurs :
 * buffs, malus, blessures, états narratifs temporaires.
 * Chaque trait possède une durée, des effets, un type, et une origine.
 */

export type TraitType = 'buff' | 'malus' | 'blessure' | 'narratif';

export type TraitEffect = Record<string, number | undefined>;

/**
 * Instance active d’un trait appliqué à un gladiateur donné.
 */
export interface TraitInstance {
  traitId: string;
  remaining: number;     // Nombre de cycles restants
  source?: string;       // Optionnel : effet, mission, module, etc.
}

/**
 * Définition d’un trait possible (chargé depuis JSON).
 */
export interface TraitDefinition {
  id: string;
  label: string;
  type: TraitType;
  duration: number;
  effect: TraitEffect;
  gravity?: 'léger' | 'grave'; // Uniquement pour blessures
  blocksTraining?: boolean;    // Facultatif : empêche entraînement
}
