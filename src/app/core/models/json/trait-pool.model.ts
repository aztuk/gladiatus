import { TraitEffect } from '../trait.model';

/**
 * Types possibles pour les traits.
 */
export type TraitType = 'buff' | 'malus' | 'blessure' | 'narratif';

/**
 * Définition d’un trait possible (chargé depuis JSON).
 */
export interface TraitDefinition {
  id: string;
  label: string;
  type: TraitType;
  duration: number;
  effect: TraitEffect;
  gravity?: 'léger' | 'grave';
  blocksTraining?: boolean;
}
