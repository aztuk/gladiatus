import { Component, computed, inject, Input } from '@angular/core';
import { ALL_FACTIONS, FactionDefinition, FactionId } from '../../../../core/models/reputation.model';
import { ReputationService } from '../../../../core/context/services/reputation.service';
import { IconComponent } from '../../../../components/icon/icon-illustration/icon.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hud-reputation-item',
  imports: [IconComponent, NgClass],
  templateUrl: './hud-reputation-item.component.html',
  styleUrl: './hud-reputation-item.component.scss'
})
export class HudReputationItemComponent {
  @Input() faction!: FactionDefinition;

  private rep = inject(ReputationService);

  value = computed(() => this.rep.getReputation(this.faction.id));

  status = computed(() => {
    const v = this.value();
    if (v <= -50) return 'ennemi';
    if (v <= -20) return 'hostile';
    if (v < 20) return 'neutre';
    if (v < 50) return 'amical';
    return 'allié';
  });

  label = computed(() => {
    const map = {
      ennemi: 'Ennemi',
      hostile: 'Hostile',
      neutre: 'Neutre',
      amical: 'Amical',
      allié: 'Allié',
    };
    return map[this.status()];
  });
}
