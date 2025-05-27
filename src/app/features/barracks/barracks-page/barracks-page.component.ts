import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GladiatorListComponent } from '../gladiator-list/gladiator-list.component';
import { GladiatorPanelComponent } from '../gladiator-panel/gladiator-panel.component';
import { GameContextService } from '../../../core/context/game-context.service';
import { Gladiator } from '../../../core/models/gladiator.model';
@Component({
  selector: 'app-barracks-page',
  standalone: true,
  imports: [CommonModule, GladiatorListComponent, GladiatorPanelComponent],
  templateUrl: './barracks-page.component.html',
  styleUrls: ['./barracks-page.component.scss'],
})
export class BarracksPageComponent {
  private context = inject(GameContextService);

  gladiators = computed(() => this.context.getAllGladiators());
  selectedId = signal<string | null>(null);

  getSelectedGladiator(): Gladiator | null {
    const id = this.selectedId();
    return this.gladiators().find(g => g.id === id) ?? null;
  }

  select(id: string) {
    this.selectedId.set(id);
  }
}
