import { Injectable } from '@angular/core';
import { Subject, Observable, filter } from 'rxjs';
import { GameEvent } from './game-event.model';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private event$ = new Subject<GameEvent>();

  /**
   * Émet un événement global dans le système.
   */
  emit(event: GameEvent): void {
    this.event$.next(event);
  }

  /**
   * Permet d’écouter tous les événements émis.
   */
  onEvent(): Observable<GameEvent> {
    return this.event$.asObservable();
  }

  /**
   * Permet d’écouter uniquement un type d’événement donné.
   */
  on<T extends GameEvent['type']>(type: T): Observable<Extract<GameEvent, { type: T }>> {
    return this.event$.pipe(
      filter((e): e is Extract<GameEvent, { type: T }> => e.type === type)
    );
  }
}

export function provideEventBus() {
  return {
    provide: EventBusService,
    useClass: EventBusService,
  };
}
