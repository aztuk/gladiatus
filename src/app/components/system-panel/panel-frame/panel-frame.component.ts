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
  @Output() closed = new EventEmitter<void>();

  position = { x: 100, y: 100 };

  private dragging = false;
  private offset = { x: 0, y: 0 };

  startDrag(event: PointerEvent) {
    const overlay = (event.target as HTMLElement).classList.contains('panel-header');
    if (!overlay) return;

    event.preventDefault();
    this.dragging = true;
    this.offset.x = event.clientX - this.position.x;
    this.offset.y = event.clientY - this.position.y;
    window.addEventListener('pointermove', this.onDrag);
    window.addEventListener('pointerup', this.stopDrag);
  }

  close() {
    this.closed.emit();
  }

  private onDrag = (event: PointerEvent) => {
    if (!this.dragging) return;
    this.position.x = event.clientX - this.offset.x;
    this.position.y = event.clientY - this.offset.y;
  };

  private stopDrag = () => {
    this.dragging = false;
    window.removeEventListener('pointermove', this.onDrag);
    window.removeEventListener('pointerup', this.stopDrag);
  };
}
