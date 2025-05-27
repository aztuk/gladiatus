/**
 * Composant affichant les détails d’un gladiateur sélectionné dans la caserne.
 * Inclut ses stats principales, ses traits, et des zones réservées à l’équipement.
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gladiator, GladiatorState } from '../../../core/models/gladiator.model';

@Component({
  selector: 'app-gladiator-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gladiator-panel.component.html',
  styleUrls: ['./gladiator-panel.component.scss'],
})
export class GladiatorPanelComponent {
  @Input() gladiator!: Gladiator;
  @Input() state!: GladiatorState;
}
