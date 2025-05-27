import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GladiatorCardComponent } from '../gladiator-card/gladiator-card.component';
import { RecruitmentService } from '../services/recruitment.service';
import { GameContextService } from '../../../core/context/game-context.service';
import { GladiatorCandidate } from '../../../core/models/gladiator.model';
import { IconComponent } from '../../../components/icon/icon-illustration/icon.component';

@Component({
  selector: 'app-recruitment-page',
  standalone: true,
  imports: [CommonModule, GladiatorCardComponent],
  templateUrl: './recruitment-page.component.html',
  styleUrls: ['./recruitment-page.component.scss']
})
export class RecruitmentPageComponent {
  private readonly recruitment = inject(RecruitmentService);
  private readonly context = inject(GameContextService);

  readonly candidates = signal<GladiatorCandidate[]>([]);
  readonly gold = computed(() => this.context.getGold());

  constructor() {
    this.drawCandidates();
  }

  drawCandidates(): void {
    this.candidates.set(this.recruitment.generateCandidates());
  }

  recruit(candidate: GladiatorCandidate): void {
    if (candidate.cost <= this.gold()) {
      this.recruitment.recruitCandidate(candidate);
      this.drawCandidates();
    }
  }
}
