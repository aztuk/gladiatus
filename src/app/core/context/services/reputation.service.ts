/**
 * Gère la réputation du joueur auprès des différentes factions.
 * Utilisé par les effets, les résolveurs et les systèmes d’influence.
 */

import { Injectable } from '@angular/core';
import { FactionId } from '../../models/reputation.model';


@Injectable({ providedIn: 'root' })
export class ReputationService {
  private reputationMap = new Map<FactionId, number>([
    ['empereur', -50],
    ['patriciens', 25],
    ['peuple', 0],
    ['armee', -25],
  ]);

  /**
   * Modifie la réputation d'une faction (positif ou négatif).
   */
  modifyReputation(faction: FactionId, amount: number): void {
    const current = this.reputationMap.get(faction) ?? 0;
    this.reputationMap.set(faction, current + amount);
  }

  /**
   * Récupère la réputation actuelle envers une faction.
   */
  getReputation(faction: FactionId): number {
    return this.reputationMap.get(faction) ?? 0;
  }

  /**
   * Retourne toutes les réputations (lecture seule).
   */
  getAll(): ReadonlyMap<FactionId, number> {
    return this.reputationMap;
  }

  /**
   * Permet l’export brut pour sauvegarde ou debug.
   */
  exportState(): Record<FactionId, number> {
    return  Object.fromEntries(this.reputationMap.entries()) as Record<FactionId, number>;
  }
}

