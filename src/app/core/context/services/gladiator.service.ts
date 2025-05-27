/**
 * Service centralisant les données liées aux gladiateurs.
 * Gère la célébrité, la fatigue, le moral, l'XP, le virtus, et permet l'accès à tous les gladiateurs.
 */

import { Injectable } from '@angular/core';
import { Gladiator, GladiatorState } from '../../models/gladiator.model';

@Injectable({ providedIn: 'root' })
export class GladiatorService {
  private gladiatorMap = new Map<string, Gladiator>();

  addGladiator(glad: Gladiator): void {
    this.gladiatorMap.set(glad.id, glad);
    this.fameMap.set(glad.id, glad.celebrité);
    this.fatigueMap.set(glad.id, glad.fatigue);
    this.moralMap.set(glad.id, glad.moral);
    this.xpMap.set(glad.id, {}); // Vide par défaut, peut être remplacé
    if (glad.virtusMultiplier > 1.0) {
      this.virtusRevealed.add(glad.id);
    }
  }

  getAllGladiators(): Gladiator[] {
    return Array.from(this.gladiatorMap.values());
  }

  getGladiator(id: string): Gladiator | undefined {
    return this.gladiatorMap.get(id);
  }


  // === Célébrité ===
  private fameMap = new Map<string, number>();

  getFame(gladId: string): number {
    return this.fameMap.get(gladId) ?? 0;
  }

  modifyFame(gladId: string, amount: number): void {
    const current = this.getFame(gladId);
    this.fameMap.set(gladId, current + amount);
  }

  // === Fatigue ===
  private fatigueMap = new Map<string, number>();

  getFatigue(gladId: string): number {
    return this.fatigueMap.get(gladId) ?? 0;
  }

  addFatigue(gladId: string, amount: number): void {
    const current = this.getFatigue(gladId);
    this.fatigueMap.set(gladId, current + amount);
  }

  removeFatigue(gladId: string, amount: number): void {
    const current = this.getFatigue(gladId);
    this.fatigueMap.set(gladId, Math.max(0, current - amount));
  }

  // === Moral ===
  private moralMap = new Map<string, number>();

  getMoral(gladId: string): number {
    return this.moralMap.get(gladId) ?? 10;
  }

  modifyMoral(gladId: string, delta: number): void {
    const current = this.getMoral(gladId);
    this.moralMap.set(gladId, Math.max(0, current + delta));
  }

  // === XP ===
  private xpMap = new Map<string, Record<string, number>>();

  getXP(gladId: string): Record<string, number> {
    return this.xpMap.get(gladId) ?? {};
  }

  addXP(gladId: string, skill: string, xp: number): void {
    const current = this.getXP(gladId);
    current[skill] = (current[skill] ?? 0) + xp;
    this.xpMap.set(gladId, current);
  }

  // === Virtus ===
  private virtusRevealed = new Set<string>();

  revealVirtus(gladId: string): void {
    this.virtusRevealed.add(gladId);
  }

  hasRevealedVirtus(gladId: string): boolean {
    return this.virtusRevealed.has(gladId);
  }

  // === Accès combiné à tous les gladiateurs ===
  getAllGladiatorStates(): { id: string; state: GladiatorState }[] {
    const ids = new Set<string>([
      ...this.fameMap.keys(),
      ...this.fatigueMap.keys(),
      ...this.moralMap.keys(),
      ...this.xpMap.keys(),
      ...this.virtusRevealed,
    ]);

    return Array.from(ids).map((id) => ({
      id,
      state: {
        fame: this.getFame(id),
        fatigue: this.getFatigue(id),
        moral: this.getMoral(id),
        virtusRevealed: this.hasRevealedVirtus(id),
        xp: this.getXP(id),
        traits: [], // À remplir avec TraitEngineService
      },
    }));
  }
}
