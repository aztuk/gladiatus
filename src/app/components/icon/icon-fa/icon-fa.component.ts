/**
 * Composant Angular affichant une icône Font Awesome à partir d’un identifiant logique.
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FaIconId, FA_ICON_MAP } from '../icon-map.config';

@Component({
  selector: 'app-icon-fa',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  template: `<fa-icon [icon]="icon" [ngClass]="size"></fa-icon>`,
  styleUrls: ['./icon-fa.component.scss']
})
export class IconFaComponent {
  @Input({ required: true }) iconId!: FaIconId;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';

  get icon() {
    return FA_ICON_MAP[this.iconId];
  }
  get sizeClass(): string {
    return `fa-${this.size}`;
  }
}
