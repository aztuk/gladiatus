/**
 * Résout l’effet "gain_materials" : ajoute des matériaux au stock global.
 */

import { GainMaterialsEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveGainMaterials(
  effect: GainMaterialsEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.addMaterial(effect.materialId, effect.amount);

  bus.emit({
    type: GameEventTypes.MaterialsGained,
    payload: {
      materialId: effect.materialId,
      amount: effect.amount
    }
  });
}
