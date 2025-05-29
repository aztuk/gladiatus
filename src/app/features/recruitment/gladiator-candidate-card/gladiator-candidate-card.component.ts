import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseStat, GladiatorCandidate, WeaponSkill } from '../../../core/models/gladiator.model';
import { BASE_STAT_ICON_MAP, IconIllustrationId } from '../../../components/icon/icon-illustration-map.config';
import { GladiatorAvatarComponent } from "../../../components/gladiator/gladiator-avatar/gladiator-avatar.component";
import { GladiatorTraitsComponent } from "../../../components/gladiator/gladiator-traits/gladiator-traits.component";
import { GladiatorStatsComponent } from '../../../components/gladiator/gladiator-stats/gladiator-stats.component';
import { CombatFormulaService } from '../../../core/combat/combat-formula.service';
import { IconComponent } from '../../../components/icon/icon-illustration/icon.component';

@Component({
  selector: 'app-gladiator-candidate-card',
  standalone: true,
  imports: [CommonModule, GladiatorAvatarComponent, GladiatorTraitsComponent, GladiatorStatsComponent, IconComponent],
  templateUrl: './gladiator-candidate-card.component.html',
  styleUrls: ['./gladiator-candidate-card.component.scss']
})
export class GladiatorCandidateCardComponent {
  @Input() candidate!: GladiatorCandidate;
  @Input() canRecruit = true;
  @Output() recruitClicked = new EventEmitter<void>();

  protected readonly baseStats = Object.values(BaseStat) as BaseStat[] ;
  private readonly combatFormula = inject(CombatFormulaService);

  public statIcons = BASE_STAT_ICON_MAP;
  BaseStat = BaseStat;

  readonly damage = computed(() => {
    const attack = this.candidate.baseStats.attack ?? 0;
    const best = this.combatFormula.getBestWeaponSkill(this.candidate.weaponSkills);
    return this.combatFormula.calculateDamage(attack, best.value);
  });

}

