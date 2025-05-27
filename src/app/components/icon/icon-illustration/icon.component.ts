/**
 * Composant Angular affichant une icône illustrée PNG à partir d’un identifiant logique centralisé.
 * S’utilise partout dans l’interface pour garantir homogénéité et scalabilité.
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconIllustrationService } from '../../../core/ui/icon-illustration.service';
import { IconIllustrationId } from './../icon-illustration-map.config';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input({ required: true }) icon!: IconIllustrationId;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'auto' | undefined;

  constructor(private iconService: IconIllustrationService) {}

  get src(): string {
    return this.iconService.getSrc(this.icon);
  }

  get alt(): string {
    return this.iconService.getAlt(this.icon);
  }

  get cssClass(): string {
    const def = this.iconService.getDefinition(this.icon);
    const resolvedSize = this.size || def.size || 'sm';
    return `icon-${resolvedSize} ${def.class ?? ''}`;
  }
}
