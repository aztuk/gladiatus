import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Origine } from '../../../core/models/gladiator.model';
import { ORIGIN_ICON_MAP } from '../../icon/icon-illustration-map.config';
import { IconComponent } from "../../icon/icon-illustration/icon.component";

@Component({
  selector: 'app-gladiator-avatar',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './gladiator-avatar.component.html',
  styleUrls: ['./gladiator-avatar.component.scss']
})
export class GladiatorAvatarComponent {
  @Input() avatarId!: number;
  @Input() origine!: Origine;
  @Input() name?: string;
  @Input() size?: 'lg' | 'xs' = 'lg';


  public origineIcon = ORIGIN_ICON_MAP;

  getAvatarClass(): string {
    return `avatar ${this.size}`;
  }
}
