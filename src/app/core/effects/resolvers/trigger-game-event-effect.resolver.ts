/**
 * Déclenche un événement système arbitraire via un effet transverse.
 * Permet à n’importe quel système de provoquer un GameEvent à la volée.
 */

import { TriggerGameEventEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';

export function resolveTriggerGameEvent(
  effect: TriggerGameEventEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  bus.emit(effect.event);
}
