/**
 * Représente l’état global courant du jeu à un instant donné.
 * Peut être utilisé pour :
 * - le debug
 * - les sauvegardes/restaurations
 * - les snapshots
 */

import { GladiatorState } from '../models/gladiator.model';
import { FactionId } from '../models/reputation.model';
import { TraitInstance } from '../models/trait.model';

/**
 * État global du jeu à un instant donné.
 * Peut être exporté pour debug, sauvegarde ou reset.
 */
export interface GameContextState {
  /** Total d’or global (ressource principale) */
  gold: number;

  /** Total de matériaux (craft) */
  materials: Record<string, number>;

  /** Prestige global du joueur (long terme) */
  prestige: number;

  /** Cycle courant du jeu */
  currentCycle: number;

  /** Réputation auprès des différentes factions */
  reputation: Record<FactionId, number>;

  /** État complet des gladiateurs */
  gladiators: Record<string, GladiatorState>;

}
