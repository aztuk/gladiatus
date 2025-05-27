/**
 * Service transverse de gestion du temps de jeu.
 * Gère les cycles réels, les événements `CYCLE_STARTED` et `CYCLE_ENDED`,
 * et permet de démarrer, mettre en pause ou accélérer le temps.
 */

import { Injectable, Signal, effect, signal, untracked } from '@angular/core';
import { EventBusService } from '../events/event-bus.service';
import { GameContextService } from '../context/game-context.service';
import { GameEventTypes } from '../events/game-event-types';
/**
 * Service transverse de gestion du temps de jeu en temps réel.
 * Pause automatique si un panneau UI est ouvert.
 */
@Injectable({ providedIn: 'root' })
export class GameClockService {
  static instance: GameClockService;

  readonly BASE_CYCLE_DURATION_MS = 60000;
  readonly START_YEAR_BC = 75;

  private currentCycle = signal<number>(0);
  private speedMultiplier = signal<number>(1);
  private externalPauseSignal = signal<boolean>(false);
  private nextTimeout: any = null;
  private cycleStartTime = signal<number>(performance.now());
  private currentCycleDuration = signal<number>(this.getDelay());
  private progress = signal<number>(0);
  private progressRAF: number | null = null;
  private accumulatedCycleTime = 0;
  private lastFrameTime = performance.now();


  constructor(
    private bus: EventBusService
  ) {
    GameClockService.instance = this;
    this.startProgressLoop();
  }

  start(): void {
    if (this.nextTimeout !== null) return;
    this.tick();
  }

  pause(): void {
    this.lastFrameTime = performance.now();
    this.setSpeed(0);
  }

  resume(mult = 1): void {
    this.setSpeed(mult);
  }

  setSpeed(mult: number): void {
    this.speedMultiplier.set(mult);
    this.lastFrameTime = performance.now();
  }

  getSpeedSignal(): Signal<number> {
    return this.speedMultiplier.asReadonly();
  }

  setExternalPause(isPaused: boolean): void {
    this.externalPauseSignal.set(isPaused);
  }

  getCurrentCycle(): number {
    return this.currentCycle();
  }

  getCurrentCycleSignal() {
    return this.currentCycle.asReadonly();
  }

  getCycleProgressSignal(): Signal<number> {
    return this.progress.asReadonly();
  }

  getLastTickTimeSignal() {
    return this.cycleStartTime.asReadonly();
  }

  getCurrentCycleDurationSignal() {
    return this.currentCycleDuration.asReadonly();
  }

  private getDelay(): number {
    const speed = untracked(this.speedMultiplier);
    return speed > 0 ? this.BASE_CYCLE_DURATION_MS / speed : Infinity;
  }

  private scheduleNextTick(): void {
    const delay = this.getDelay();
    this.nextTimeout = setTimeout(() => {
      this.tick();
      this.scheduleNextTick();
    }, delay);
  }

  private tick(): void {
    if (this.externalPauseSignal()) return;
    this.accumulatedCycleTime = 0;
    this.lastFrameTime = performance.now();
    this.progress.set(0);
    this.cycleStartTime.set(performance.now());
    this.currentCycleDuration.set(this.getDelay());

    const next = this.currentCycle() + 1;
    this.currentCycle.set(next);

    this.bus.emit({ type: 'CYCLE_STARTED', payload: { cycle: next } });

    // effets système à déclencher ici...

    this.bus.emit({ type: 'CYCLE_ENDED', payload: { cycle: next } });
  }


  private startProgressLoop(): void {
    const loop = () => {
      const now = performance.now();
      const delta = now - this.lastFrameTime;
      this.lastFrameTime = now;

      const speed = this.speedMultiplier();

      if (speed > 0) {
        this.accumulatedCycleTime += delta * speed;
      }

      const ratio = Math.min(1, this.accumulatedCycleTime / this.BASE_CYCLE_DURATION_MS);
      this.progress.set(ratio);

      // 🧠 Le tick est déclenché dès que la barre est pleine
      if (ratio >= 1) {
        this.tick(); // mettra progress = 0, reset accumulatedTime, etc.
      }

      this.progressRAF = requestAnimationFrame(loop);
    };

    this.progressRAF = requestAnimationFrame(loop);
  }



}
