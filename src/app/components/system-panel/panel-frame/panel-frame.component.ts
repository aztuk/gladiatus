import { Component, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-frame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-frame.component.html',
  styleUrls: ['./panel-frame.component.scss']
})
export class PanelFrameComponent {
  @Input() zIndex = 1000;
  @Input() title = '';
  @Input() description = '';
  @Output() closed = new EventEmitter<void>();

  position = { x: 100, y: 100 };

  close() {
    this.closed.emit();
  }


}
