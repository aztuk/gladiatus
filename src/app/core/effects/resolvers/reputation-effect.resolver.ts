/**
 * Résout l’effet "reputation_change" : modifie la réputation auprès d’une faction.
 */

import { ReputationChangeEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveReputation(
  effect: ReputationChangeEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.modifyReputation(effect.faction, effect.amount);

  bus.emit({
    type: GameEventTypes.FactionReputationChanged,
    payload: { faction: effect.faction, amount: effect.amount },
  });
}
