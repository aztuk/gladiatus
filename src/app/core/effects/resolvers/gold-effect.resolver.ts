/**
 * Résout l’effet "gain_gold" : ajoute un montant d’or à l’état global.
 */

import { GainGoldEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveGainGold(
  effect: GainGoldEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.incrementGold(effect.amount);

  bus.emit({ type: GameEventTypes.GoldGained, payload: { amount: effect.amount } });
}
