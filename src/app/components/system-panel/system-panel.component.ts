import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  signal,
  ElementRef,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-system-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system-panel.component.html',
  styleUrls: ['./system-panel.component.scss']
})
export class SystemPanelComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() showClose = true;
  @Input() showConfirm = false;
  @Input() confirmLabel = 'Valider';
  @Input() tabsHorizontal: string[] = [];
  @Input() tabsVertical: string[] = [];
  @Input() footerText?: string;

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() tabChanged = new EventEmitter<string>();
  @Output() navigatedBack = new EventEmitter<void>();

  activeTab = '';
  canGoBack = false;

  position = { x: 100, y: 100 };

  private readonly host = inject(ElementRef<HTMLElement>);

  ngOnInit() {
    if (this.tabsHorizontal?.length) {
      this.activeTab = this.tabsHorizontal[0];
    } else if (this.tabsVertical?.length) {
      this.activeTab = this.tabsVertical[0];
    }
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    this.tabChanged.emit(tab);
  }

  close() {
    this.closed.emit();
  }

  confirm() {
    this.confirmed.emit();
  }

  navigateBack() {
    this.navigatedBack.emit();
  }

  bringToFront() {
    this.host.nativeElement.dispatchEvent(new Event('click', { bubbles: true }));
  }

  // === Keyboard shortcuts ===
  @HostListener('document:keydown.escape')
  onEsc() {
    this.close();
  }

  @HostListener('document:keydown.enter')
  onEnter() {
    if (this.showConfirm) this.confirm();
  }
}
