/**
 * Ce composant de test applique un effet `injury` à un gladiateur fictif
 * et vérifie la propagation complète dans le système :
 * - chargement des traits
 * - application via TraitEngineService
 * - émission des événements
 * - suivi de l’effet (durée, expiration)
 */

import { Component, inject, signal } from '@angular/core';
import { EventBusService } from './core/events/event-bus.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LudusComponent } from './features/ludus/ludus-page/ludus-page.component';
import { SystemPanelHostComponent } from './components/system-panel/system-panel-host.component';
import { GameClockService } from './core/clock/game-clock.service';
import { GameContextService } from './core/context/game-context.service';
import { GameEvent } from './core/events/game-event.model';
import { HudRootComponent } from './features/hud/hud-root/hud-root.component';
import { HudLogComponent } from "./features/hud/hud-log/hud-log.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LudusComponent, RouterOutlet, SystemPanelHostComponent, HudRootComponent, HudLogComponent],
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private readonly clock = inject(GameClockService);
  private readonly bus = inject(EventBusService);

  /** Signaux d’état */
  cycle = this.clock.getCurrentCycleSignal();
  speed = signal(1);
  externalPause = signal(false);
  logs = signal<string[]>([]);

  constructor() {
    // Écoute des événements de cycle
    this.bus.onEvent().subscribe((event: GameEvent) => {
      if (event.type === 'CYCLE_STARTED' || event.type === 'CYCLE_ENDED') {
        this.logs.update(logs => [`[${event.type}] cycle ${event.payload?.cycle}`, ...logs].slice(0, 10));
      }
    });
  }

  start(): void {
    this.clock.start();
  }

  pause(): void {
    this.clock.pause();
    this.speed.set(0);
  }

  resume(): void {
    this.clock.resume();
    this.speed.set(1);
  }

  setSpeed(mult: number): void {
    this.clock.setSpeed(mult);
    this.speed.set(mult);
  }

  toggleExternalPause(): void {
    const paused = !this.externalPause();
    this.externalPause.set(paused);
    this.clock.setExternalPause(paused);
  }

  get formattedCycle() {
    const total = this.cycle();
    const month = (total % 12) + 1;
    const year = Math.floor(total / 12) + 1;
    return `Mois ${month} / Année ${year}`;
  }

  get weekProgress() {
    return (this.cycle() % 1) * 4; // utile si on affine à la semaine plus tard
  }
}
