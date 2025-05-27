import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UiPanelService } from '../../../core/ui/ui-panel.service';
import { RecruitmentPageComponent } from '../../recruitment/recruitment-page/recruitment-page.component';
import { BarracksPageComponent } from '../../barracks/barracks-page/barracks-page.component';

@Component({
  selector: 'app-ludus',
  standalone: true,
  templateUrl: './ludus-page.component.html',
  styleUrls: ['./ludus-page.component.scss'],
  imports: [NgFor]
})
export class LudusComponent {

  buildings: any = [];

  constructor(private panel: UiPanelService) {
    this.buildings = [
    { id: 'tresorerie', name: 'Trésorerie',       slot: { x: 697, y:263 }, width: 240, click: () => {} },
    { id: 'curia',      name: 'Curia',            slot: { x: 649, y:398 }, width: 177, click: () => {}},
    { id: 'forum',      name: 'Forum',            slot: { x: 730, y:479 }, width: 150, click: () => this.openRecruitmentPanel() },
    { id: 'arene',      name: 'Arène',            slot: { x: 442, y:292 }, width: 250, click: () => {} },
    { id: 'caserne',    name: 'Caserne',          slot: { x: 351, y:347 }, width: 132, click: () => this.openBarracksPanel() },
    { id: 'infirmerie', name: 'Infirmerie',       slot: { x: 350, y:457 }, width: 140, click: () => {} },
    { id: 'forge',      name: 'Forge',            slot: { x: 394, y:571 }, width: 163, click: () => {} },
    ]
  }


  openRecruitmentPanel() {
    this.panel.open('recruitment', RecruitmentPageComponent, {
      title: 'Forum',
      showClose: true
    });
  }

  openBarracksPanel() {
    this.panel.open('barracks', BarracksPageComponent, {
      title: 'Caserne',
      showClose: true
    });
  }

/*

  @Input() title = '';
  @Input() showClose = true;
  @Input() showConfirm = false;
  @Input() confirmLabel = 'Valider';
  @Input() tabsHorizontal: string[] = [];
  @Input() tabsVertical: string[] = [];
  @Input() zIndex = 1000;
  @Input() footerText?: string;*/
}
