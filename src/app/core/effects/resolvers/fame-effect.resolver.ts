/**
 * Résout l’effet "gain_fame" : modifie la célébrité d’un gladiateur.
 */

import { GainFameEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveFame(
  effect: GainFameEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.modifyFame(effect.targetId, effect.amount);

  bus.emit({
    type: GameEventTypes.FameChanged,
    payload: { gladiatorId: effect.targetId, amount: effect.amount },
  });
}
