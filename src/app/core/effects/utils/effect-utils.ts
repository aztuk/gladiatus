/**
 * Utilitaire pour s'assurer que le TraitEngine est bien chargé
 * avant d'appliquer des effets nécessitant un accès au pool de traits.
 * Appelle loadTraits() si ce n’est pas déjà fait, puis applique les effets.
 */

import { TraitEngineService } from '../trait-engine.service';
import { EffectEngineService } from '../effect-engine.service';
import { GameEffect } from '../game-effect.model';

/**
 * Applique une ou plusieurs effets avec garantie de chargement des traits.
 */
export async function ensureTraitsLoadedAndApply(
  traitEngine: TraitEngineService,
  effectEngine: EffectEngineService,
  effects: GameEffect[]
): Promise<void> {
  // Si pool déjà chargé → skip
  if (!traitEngine.hasLoaded()) {
    await traitEngine.loadTraits();
  }

  // Appliquer les effets
  effectEngine.applyEffects(effects);
}
