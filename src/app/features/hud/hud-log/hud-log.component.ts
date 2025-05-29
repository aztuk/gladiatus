/**
 * Composant HUD — Affiche les derniers messages système (logs).
 * Version autonome avec signal local temporaire.
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogService, Log } from '../../../core/events/event-log.service';
import { CombatFormulaService } from '../../../core/combat/combat-formula.service';

@Component({
  selector: 'app-hud-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-log.component.html',
  styleUrls: ['./hud-log.component.scss'],
})
export class HudLogComponent {
  logs = inject(EventLogService).logs;

  constructor() {
    const service = inject(CombatFormulaService);
        // Tank
    console.log('Tank brut →', service.calculateDamage(20, 0)); // ~20
    console.log('Tank DPS →', service.calculateDamagePerTurn(20, 0, 10)); // ~2.0

    // Spécialiste
    console.log('Spécialiste →', service.calculateDamage(6, 20)); // ~14
    console.log('Spécialiste DPS →', service.calculateDamagePerTurn(6, 20, 20)); // ~2.8

    // Polyvalent
    console.log('Polyvalent →', service.calculateDamage(10, 10)); // ~15.8
    console.log('Polyvalent DPS →', service.calculateDamagePerTurn(10, 10, 10)); // ~1.58

    // Faible
    console.log('Faible →', service.calculateDamage(4, 2)); // ~4.8
    console.log('Faible DPS →', service.calculateDamagePerTurn(4, 2, 5)); // ~0.24
  }
}
