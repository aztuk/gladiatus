/**
 * Résout l’effet générique "add_fatigue" :
 * Ajoute une quantité de fatigue au gladiateur concerné.
 */

import { AddFatigueEffect, RecoverFatigueEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveAddFatigue(
  effect: AddFatigueEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.addFatigue(effect.targetId, effect.amount);

  bus.emit({
    type: GameEventTypes.FatigueChanged,
    payload: {
      gladiatorId: effect.targetId,
      delta: effect.amount,
    }
  });
}

export function resolveRecoverFatigue(
  effect: RecoverFatigueEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.removeFatigue(effect.targetId, effect.amount);

  bus.emit({
    type: GameEventTypes.FatigueRecovered,
    payload: {
      gladiatorId: effect.targetId,
      delta: -effect.amount,
    }
  });
}
