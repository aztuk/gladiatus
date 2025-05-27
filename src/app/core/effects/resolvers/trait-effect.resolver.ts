/**
 * Résout l’effet "gain_trait" : applique un trait (buff, malus, etc.) à un gladiateur.
 */

import { GainTraitEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { inject } from '@angular/core';
import { TraitEngineService } from '../trait-engine.service';
import { GameEventTypes } from '../../events/game-event-types';

/**
 * Résout l’effet "gain_trait" : passe par le moteur de traits pour application propre.
 */
export function resolveTrait(
  effect: GainTraitEffect,
  engine: TraitEngineService,
  bus: EventBusService
): void {
  engine.applyTrait(effect.targetId, effect.traitId);

  bus.emit({
    type: GameEventTypes.TraitApplied,
    payload: { gladiatorId: effect.targetId, traitId: effect.traitId },
  });
}
