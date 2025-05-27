/**
 * Résout l’effet "spend_gold" : retire de l’or au joueur.
 */

import { SpendGoldEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveSpendGold(
  effect: SpendGoldEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.spendGold(effect.amount);

  bus.emit({
    type: GameEventTypes.GoldSpent,
    payload: { amount: effect.amount }
  });
}
