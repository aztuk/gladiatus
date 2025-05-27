import { Injectable, signal } from '@angular/core';
import { GameContextState } from './game-context.model';
import { ReputationService } from './services/reputation.service';
import { GameClockService } from '../clock/game-clock.service';
import { FactionId } from '../models/reputation.model';
import { Gladiator, GladiatorState } from '../models/gladiator.model';
import { GladiatorService } from './services/gladiator.service';

/**
 * Service principal du contexte de jeu.
 * Gère les états globaux (ressources, réputation, cycle...) et expose l’état consolidé.
 */
@Injectable({ providedIn: 'root' })
export class GameContextService {
  // === GLOBAL ===
  private gold = signal(1000);
  private prestige = signal(0);
  private materials = signal<Record<string, number>>({});


  constructor(
    private readonly reputation: ReputationService,
    private readonly gladiator: GladiatorService
  ) {}

  // === GOLD ===
  incrementGold(amount: number): void {
    this.gold.update(g => g + amount);
  }

  spendGold(amount: number): void {
    this.gold.update(g => Math.max(0, g - amount));
  }

  getGold(): number {
    return this.gold();
  }

  // === PRESTIGE ===
  addPrestige(amount: number): void {
    this.prestige.update(p => p + amount);
  }

  getPrestige(): number {
    return this.prestige();
  }

  // === MATERIALS ===
  addMaterial(materialId: string, amount: number): void {
    const current = { ...this.materials() };
    current[materialId] = (current[materialId] ?? 0) + amount;
    this.materials.set(current);
  }

  spendMaterial(materialId: string, amount: number): void {
    const current = { ...this.materials() };
    current[materialId] = Math.max(0, (current[materialId] ?? 0) - amount);
    this.materials.set(current);
  }

  getMaterials(): Record<string, number> {
    return this.materials();
  }

  // === GLADIATEURS (via service dédié) ===
  getAllGladiators(): Gladiator[] {
    return this.gladiator.getAllGladiators();
  }

  addGladiator(glad: Gladiator): void {
    this.gladiator.addGladiator(glad);
  }

  getFame(gladId: string): number {
    return this.gladiator.getFame(gladId);
  }

  modifyFame(gladId: string, amount: number): void {
    this.gladiator.modifyFame(gladId, amount);
  }

  addFatigue(gladId: string, amount: number): void {
    this.gladiator.addFatigue(gladId, amount);
  }

  removeFatigue(gladId: string, amount: number): void {
    this.gladiator.removeFatigue(gladId, amount);
  }

  getFatigue(gladId: string): number {
    return this.gladiator.getFatigue(gladId);
  }

  modifyMoral(gladId: string, delta: number): void {
    this.gladiator.modifyMoral(gladId, delta);
  }

  getMoral(gladId: string): number {
    return this.gladiator.getMoral(gladId);
  }

  addXP(gladId: string, skill: string, xp: number): void {
    this.gladiator.addXP(gladId, skill, xp);
  }

  getXP(gladId: string): Record<string, number> {
    return this.gladiator.getXP(gladId);
  }

  revealVirtus(gladId: string): void {
    this.gladiator.revealVirtus(gladId);
  }

  hasRevealedVirtus(gladId: string): boolean {
    return this.gladiator.hasRevealedVirtus(gladId);
  }

  getAllGladiatorStates(): { id: string; state: GladiatorState }[] {
    return this.gladiator.getAllGladiatorStates();
  }

  // === RÉPUTATION ===
  getReputation(faction: FactionId): number {
    return this.reputation.getReputation(faction);
  }

  modifyReputation(faction: FactionId, amount: number): void {
    this.reputation.modifyReputation(faction, amount);
  }

  // === EXPORT GLOBAL ===
  exportCurrentState(): GameContextState {
    const gladiators: Record<string, GladiatorState> = {};
    for (const glad of this.getAllGladiators()) {
      gladiators[glad.id] = {
        fame: this.getFame(glad.id),
        fatigue: this.getFatigue(glad.id),
        moral: this.getMoral(glad.id),
        virtusRevealed: this.hasRevealedVirtus(glad.id),
        xp: this.getXP(glad.id),
        traits: [] // TODO: brancher au TraitEngineService
      };
    }


    return {
      gold: this.getGold(),
      prestige: this.getPrestige(),
      materials: this.getMaterials(),
      currentCycle: GameClockService.instance.getCurrentCycle(),
      reputation: this.reputation.exportState(),
      gladiators,
    };
  }
}

/**
 * Fournisseur Angular pour injection dans `app.config.ts`
 */
export function provideContext() {
  return {
    provide: GameContextService,
    useClass: GameContextService,
  };
}
