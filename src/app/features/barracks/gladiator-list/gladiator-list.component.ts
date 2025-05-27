import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gladiator } from '../../../core/models/gladiator.model';

@Component({
  selector: 'app-gladiator-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gladiator-list.component.html',
  styleUrls: ['./gladiator-list.component.scss'],
})
export class GladiatorListComponent {
  @Input() gladiators: Gladiator[] = [];
  @Output() selectGladiator = new EventEmitter<string>();

  onSelect(id: string) {
    this.selectGladiator.emit(id);
  }
}
