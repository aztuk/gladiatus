import { Injectable, Type, computed, signal } from '@angular/core';

export interface PanelInstance {
  id: string;
  key: string;
  component: Type<unknown>;
  props?: Record<string, any>;
  zIndex: number;
}

@Injectable({ providedIn: 'root' })
export class UiPanelService {
  private counter = 1000;
  private panels = signal<PanelInstance[]>([]);

  readonly openPanels = computed(() => this.panels());

  open(key: string, component: Type<unknown>, props?: Record<string, any>) {
    if (this.panels().some(p => p.key === key)) return;

    const id = crypto.randomUUID();
    this.counter++;

    this.panels.update(p => [
      ...p,
      { id, key, component, props, zIndex: this.counter }
    ]);
  }

  close(id: string) {
    this.panels.update(p => p.filter(p => p.id !== id));
  }

  closeByKey(key: string) {
    this.panels.update(p => p.filter(p => p.key !== key));
  }

  bringToFront(id: string) {
    this.counter++;
    this.panels.update(p =>
      p.map(panel =>
        panel.id === id ? { ...panel, zIndex: this.counter } : panel
      )
    );
  }

  closeAll() {
    this.panels.set([]);
  }
}
