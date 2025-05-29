/**
 * Composant Angular — Affiche les statistiques de base d’un gladiateur.
 * Utilise les icônes configurées dans BASE_STAT_ICON_MAP.
 */

import { Component, computed, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseStat } from '../../../core/models/gladiator.model';
import { IconComponent } from '../../icon/icon-illustration/icon.component';
import { BASE_STAT_ICON_MAP, BASE_STAT_LABEL_MAP } from '../../icon/icon-illustration-map.config';

@Component({
  standalone: true,
  selector: 'app-gladiator-stats',
  imports: [CommonModule, IconComponent],
  templateUrl: './gladiator-stats.component.html',
  styleUrls: ['./gladiator-stats.component.scss']
})
export class GladiatorStatsComponent {
  @Input() stats: Partial<Record<BaseStat, number>> = {};
  @Input() exclude: BaseStat[] = [];

  statKeys  = Object.values(BaseStat);

  readonly displayedStats = computed(() => {
    return Object.entries(this.stats)
      .filter(([key, val]) => !this.exclude.includes(key as BaseStat))
      .map(([key, val]) => ({ key: key as BaseStat, value: val! }));
  });

  getIcon(stat: BaseStat) {
    return BASE_STAT_ICON_MAP[stat];
  }
  getLabel(stat: BaseStat) {
    return BASE_STAT_LABEL_MAP[stat];
  }
}
