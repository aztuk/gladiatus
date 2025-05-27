/**
 * Composant HUD — Affiche les ressources du joueur : or et prestige.
 * Lecture directe et réactive depuis GameContextService.
 */

import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameContextService } from '../../../core/context/game-context.service';
import { BASE_STAT_ICON_MAP, ICON_ILLUSTRATION_MAP } from '../../../components/icon/icon-illustration-map.config';
import { IconComponent } from '../../../components/icon/icon-illustration/icon.component';

@Component({
  selector: 'app-hud-resources',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './hud-resources.component.html',
  styleUrls: ['./hud-resources.component.scss'],
})
export class HudResourcesComponent {
  private context = inject(GameContextService);

  public icons = ICON_ILLUSTRATION_MAP;

  gold = computed(() => this.context.getGold());
  prestige = computed(() => this.context.getPrestige());
}
