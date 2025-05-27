/**
 * Composant HUD — Affiche les réputations du joueur avec les différentes factions.
 * Récupère les données depuis ReputationService (core).
 */

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReputationService } from '../../../core/context/services/reputation.service';
import { ALL_FACTIONS, FactionDefinition } from '../../../core/models/reputation.model';
import { HudReputationItemComponent } from './hud-reputation-item/hud-reputation-item.component';

@Component({
  selector: 'app-hud-reputation',
  standalone: true,
  imports: [CommonModule, HudReputationItemComponent],
  templateUrl: './hud-reputation.component.html',
  styleUrls: ['./hud-reputation.component.scss'],
})
export class HudReputationComponent {
  factions: FactionDefinition[] = ALL_FACTIONS;
}
