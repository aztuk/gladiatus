/**
 * Composant HUD — Affiche les derniers messages système (logs).
 * Version autonome avec signal local temporaire.
 */

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogService, Log } from '../../../core/events/event-log.service';

@Component({
  selector: 'app-hud-log',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-log.component.html',
  styleUrls: ['./hud-log.component.scss'],
})
export class HudLogComponent {
  logs = inject(EventLogService).logs;
}
