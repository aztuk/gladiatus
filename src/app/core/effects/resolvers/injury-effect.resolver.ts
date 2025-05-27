/**
 * Résout l’effet "injury" en appliquant une blessure (trait de type "blessure").
 */

import { InjuryEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { TraitEngineService } from '../trait-engine.service';
import { inject } from '@angular/core';
import { EffectEngineService } from '../effect-engine.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveInjury(
  effect: InjuryEffect,
  traitEngine: TraitEngineService,
  bus: EventBusService
): void {
  const def = traitEngine.getTraitDefinition(effect.injuryId);

  if (!def || def.type !== 'blessure') {
    console.warn(`[Effect] Le trait "${effect.injuryId}" n’est pas une blessure valide.`);
    return;
  }

  // ✅ Appliquer la blessure via le moteur
  traitEngine.applyTrait(effect.targetId, effect.injuryId);

  // 📡 Émettre un événement métier
  bus.emit({
    type: GameEventTypes.InjuryApplied,
    payload: {
      gladiatorId: effect.targetId,
      injuryId: effect.injuryId,
    },
  });
}

