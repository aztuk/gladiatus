/**
 * Composant HUD — Affichage du mois en cours avec barre de progression.
 * La barre est continue (0→1) et visuellement découpée en 4 "semaines" via CSS.
 */

import { Component, HostListener, OnDestroy, OnInit, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameClockService } from '../../../core/clock/game-clock.service';
import { IconFaComponent } from '../../../components/icon/icon-fa/icon-fa.component';
import { getCycleDisplay } from '../../../core/clock/date.utils';

const MONTH_NAMES = [
  'Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
];

@Component({
  selector: 'app-hud-cycle',
  standalone: true,
  imports: [CommonModule, IconFaComponent],
  templateUrl: './hud-cycle.component.html',
  styleUrls: ['./hud-cycle.component.scss'],
})
export class HudCycleComponent {
  private clock = inject(GameClockService);

  currentCycle = this.clock.getCurrentCycleSignal();
  progress = this.clock.getCycleProgressSignal();
  speed = this.clock.getSpeedSignal();

  formattedCycle = computed(() => {
    return getCycleDisplay(this.currentCycle());
  });

  togglePause() {
    this.speed() > 0 ? this.clock.pause() : this.clock.resume(1);
  }

  setSpeed(mult: number) {
    this.clock.resume(mult);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (e.code === 'Space') {
      e.preventDefault();
      this.togglePause();
    }
  }
}
