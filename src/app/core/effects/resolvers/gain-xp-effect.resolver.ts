/**
 * Résout l’effet "gain_xp" : ajoute de l’XP à une compétence du gladiateur.
 */

import { GainXPEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveGainXP(
  effect: GainXPEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.addXP(effect.targetId, effect.skill, effect.xp);

  bus.emit({
    type: GameEventTypes.XP_Gained,
    payload: {
      gladiatorId: effect.targetId,
      skill: effect.skill,
      xp: effect.xp,
    }
  });
}
