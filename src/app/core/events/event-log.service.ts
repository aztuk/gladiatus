import { inject, Injectable, Signal, signal } from '@angular/core';
import { GameEvent } from './game-event.model';
import { EventBusService } from './event-bus.service';
import { GameClockService } from '../clock/game-clock.service';
import { getCycleDisplay } from '../clock/date.utils';
import { formatGameEventLog } from './event-log.utils';

export interface Log {
  date: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class EventLogService {
  private readonly bus = inject(EventBusService);
  private readonly clock = inject(GameClockService);

  private readonly _logs = signal<Log[]>([]);
  readonly logs: Signal<Log[]> = this._logs;

  constructor() {
    this.bus.onEvent().subscribe(event => {
      this.addEventToLog(event);
    });
  }

  private addEventToLog(event: GameEvent) {
    const cycle = this.clock.getCurrentCycle();
    const date = getCycleDisplay(cycle);
    const message = formatGameEventLog(event);
    const log: Log = { date, message };
    const current = this._logs();
    this._logs.set([...current.slice(-39), log]);
  }
}
