/**
 * Résout l’effet "spend_materials" : retire des matériaux.
 */

import { SpendMaterialsEffect } from '../game-effect.model';
import { GameContextService } from '../../context/game-context.service';
import { EventBusService } from '../../events/event-bus.service';
import { GameEventTypes } from '../../events/game-event-types';

export function resolveSpendMaterials(
  effect: SpendMaterialsEffect,
  context: GameContextService,
  bus: EventBusService
): void {
  context.spendMaterial(effect.materialId, effect.amount);

  bus.emit({
    type: GameEventTypes.MaterialsSpent,
    payload: {
      materialId: effect.materialId,
      amount: effect.amount
    }
  });
}
