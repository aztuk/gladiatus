import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseStat, GladiatorCandidate, WeaponSkill } from '../../../core/models/gladiator.model';
import { BASE_STAT_ICON_MAP, IconIllustrationId } from '../../../components/icon/icon-illustration-map.config';
import { IconComponent } from '../../../components/icon/icon-illustration/icon.component';
import { GladiatorAvatarComponent } from "../../../components/gladiator/gladiator-avatar/gladiator-avatar.component";

@Component({
  selector: 'app-gladiator-card',
  standalone: true,
  imports: [CommonModule, IconComponent, GladiatorAvatarComponent],
  templateUrl: './gladiator-card.component.html',
  styleUrls: ['./gladiator-card.component.scss']
})
export class GladiatorCardComponent {
  @Input() candidate!: GladiatorCandidate;
  @Input() canRecruit = true;
  @Output() recruitClicked = new EventEmitter<void>();

  protected readonly baseStats = Object.values(BaseStat) as BaseStat[] ;
  protected readonly weaponSkills = Object.values(WeaponSkill);

  public statIcons = BASE_STAT_ICON_MAP;

  getFrameColor(): string {
    switch (this.candidate.rarity) {
      case 'epic': return '#9c27b0';
      case 'rare': return '#2196f3';
      case 'common': return '#9e9e9e';
      default: return '#bdbdbd';
    }
  }
}
