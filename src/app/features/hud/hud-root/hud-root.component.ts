/**
 * Composant principal du HUD — affichage tête haute permanent.
 * Structure et affiche les sous-sections du HUD : ressources, cycle, réputation, log.
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudResourcesComponent } from '../hud-resources/hud-resources.component';
import { HudLogComponent } from '../hud-log/hud-log.component';
import { HudReputationComponent } from '../hud-reputation/hud-reputation.component';
import { HudCycleComponent } from '../hud-cycle/hud-cycle.component';

@Component({
  selector: 'app-hud-root',
  standalone: true,
  imports: [
    CommonModule,
    HudResourcesComponent,
    HudCycleComponent,
    HudReputationComponent,
    HudLogComponent,
  ],
  templateUrl: './hud-root.component.html',
  styleUrls: ['./hud-root.component.scss'],
})
export class HudRootComponent {}
