import { Component, Input } from '@angular/core';
import { WeaponSkill } from '../../../core/models/gladiator.model';
import { BASE_STAT_ICON_MAP, IconIllustrationId, WEAPONSKILL_ICON_MAP } from '../../icon/icon-illustration-map.config';
import { IconComponent } from '../../icon/icon-illustration/icon.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-gladiator-weapon-skills',
  imports: [IconComponent, NgFor],
  templateUrl: './gladiator-weapon-skills.component.html',
  styleUrl: './gladiator-weapon-skills.component.scss'
})
export class GladiatorWeaponSkillsComponent {
@Input() skills: Partial<Record<WeaponSkill, number>> = {};
  weaponSkillKeys = Object.keys(WEAPONSKILL_ICON_MAP) as WeaponSkill[];

  getIcon(skill: WeaponSkill): IconIllustrationId {
    return WEAPONSKILL_ICON_MAP[skill];
  }
}
