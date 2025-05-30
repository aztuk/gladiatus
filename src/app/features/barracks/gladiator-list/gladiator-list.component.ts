import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gladiator } from '../../../core/models/gladiator.model';
import { GladiatorAvatarComponent } from "../../../components/gladiator/gladiator-avatar/gladiator-avatar.component";

@Component({
  selector: 'app-gladiator-list',
  standalone: true,
  imports: [CommonModule, GladiatorAvatarComponent],
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
