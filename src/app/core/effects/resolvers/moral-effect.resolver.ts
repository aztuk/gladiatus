/**
 * Résout l’effet "change_moral" : modifie le moral du gladiateur.
 */

import { ChangeMoralEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveChangeMoral(
  effect: ChangeMoralEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.modifyMoral(effect.targetId, effect.amount);

  bus.emit({
    type: GameEventTypes.MoralChanged,
    payload: {
      gladiatorId: effect.targetId,
      amount: effect.amount,
    }
  });
}
