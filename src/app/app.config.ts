import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from './core/effects/effect-engine.service';
import { provideContext } from './core/context/game-context.service';
import { provideEventBus } from './core/events/event-bus.service';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideContext(),     // 👈 Fournit GameContextService
    provideEffects(),     // Fournit EffectEngineService
    provideEventBus()    // Fournit EventBusService
    ]
};
