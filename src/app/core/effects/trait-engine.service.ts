/**
 * Ce service gère l'application, la durée et l'expiration automatique
 * des traits temporaires appliqués aux gladiateurs.
 * Il centralise toutes les logiques liées aux `TraitInstance`.
 */

import { Injectable } from '@angular/core';
import { TraitDefinition, TraitInstance } from '../models/trait.model';
import { EventBusService } from '../events/event-bus.service';
import { DataService } from '../data/data.service';
import { GameEventTypes } from '../events/game-event-types';

@Injectable({ providedIn: 'root' })
export class TraitEngineService {
  /** Définition statique des traits disponibles (chargée depuis JSON) */
  private traitPool = new Map<string, TraitDefinition>();

  /** État dynamique des traits par gladiateur */
  private gladiatorTraits = new Map<string, TraitInstance[]>();

  constructor(
    private eventBus: EventBusService,
    private dataService: DataService
  ) {}

  /**
   * Charge tous les traits depuis le fichier JSON. À appeler au lancement du jeu.
   */
  async loadTraits() {
    const traits = await this.dataService.loadTraitPool();
    for (const t of traits) {
      this.traitPool.set(t.id, t);
    }
  }

  /**
   * Applique un trait à un gladiateur. Crée une instance avec durée.
   */
  applyTrait(gladId: string, traitId: string, source?: string): void {
    const def = this.traitPool.get(traitId);
    if (!def) {
      console.warn(`[TraitEngine] Trait introuvable : ${traitId}`);
      return;
    }

    const instance: TraitInstance = {
      traitId,
      remaining: def.duration,
      source,
    };

    const list = this.gladiatorTraits.get(gladId) ?? [];
    list.push(instance);
    this.gladiatorTraits.set(gladId, list);

    this.eventBus.emit({
      type: GameEventTypes.TraitApplied,
      payload: { gladiatorId: gladId, traitId },
    });
  }

  /**
   * Tick global : décrémente la durée de chaque trait actif.
   * Supprime les traits expirés et émet les événements correspondants.
   */
  tick(): void {
    for (const [gladId, traits] of this.gladiatorTraits.entries()) {
      const updated: TraitInstance[] = [];

      for (const trait of traits) {
        trait.remaining--;
        console.log(`⏱️ ${gladId} – ${trait.traitId} → ${trait.remaining}`);

        if (trait.remaining <= 0) {
          this.eventBus.emit({
            type: GameEventTypes.TraitExpired,
            payload: { gladiatorId: gladId, traitId: trait.traitId },
          });
        } else {
          updated.push(trait);
        }
      }

      this.gladiatorTraits.set(gladId, updated);
    }
  }

  /**
   * Calcule les effets cumulés de tous les traits actifs du gladiateur.
   */
  getTotalEffect(gladId: string): Record<string, number> {
    const traits = this.gladiatorTraits.get(gladId) ?? [];
    const result: Record<string, number> = {};

    for (const instance of traits) {
      const def = this.traitPool.get(instance.traitId);
      if (!def) continue;

      for (const [key, value] of Object.entries(def.effect)) {
        result[key] = (result[key] ?? 0) + (value ?? 0);
      }
    }

    return result;
  }

  /**
   * Retourne la définition statique d’un trait.
   */
  getTraitDefinition(id: string): TraitDefinition | undefined {
    return this.traitPool.get(id);
  }

  /**
   * Indique si les définitions de traits ont été chargées.
   */
  hasLoaded(): boolean {
    return this.traitPool.size > 0;
  }

  /**
   * Retourne les instances de traits d’un gladiateur.
   */
  getTraits(gladId: string): TraitInstance[] {
    return this.gladiatorTraits.get(gladId) ?? [];
  }

  /**
   * Remplace les traits actifs d’un gladiateur.
   */
  setTraits(gladId: string, list: TraitInstance[]): void {
    this.gladiatorTraits.set(gladId, list);
  }

  /**
   * Retourne toutes les instances de tous les gladiateurs.
   */
  getAllTraits(): Map<string, TraitInstance[]> {
    return this.gladiatorTraits;
  }
}
