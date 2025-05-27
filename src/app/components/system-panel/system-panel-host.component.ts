import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemPanelComponent } from './system-panel.component';
import { PanelInstance, UiPanelService } from '../../core/ui/ui-panel.service';
import { PanelFrameComponent } from './panel-frame/panel-frame.component';

@Component({
  selector: 'app-system-panel-host',
  standalone: true,
  imports: [CommonModule, SystemPanelComponent, PanelFrameComponent],
  templateUrl: './system-panel-host.component.html',
  styleUrls: ['./system-panel-host.component.scss']
})
export class SystemPanelHostComponent {
  readonly ui = inject(UiPanelService);

  trackById(index: number, panel: PanelInstance) {
    return panel.id;
  }

}
