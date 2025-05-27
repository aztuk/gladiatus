/**
 * Résout l’effet "gain_prestige" : ajoute du prestige global.
 */

import { GainPrestigeEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveGainPrestige(
  effect: GainPrestigeEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.addPrestige(effect.amount);

  bus.emit({
    type: GameEventTypes.PrestigeChanged,
    payload: { amount: effect.amount }
  });
}
