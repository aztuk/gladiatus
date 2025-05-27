import { ReputationChangeEffect } from './game-effect.model';
/**
 * Ce service applique des GameEffects un par un ou en lot, en appelant
 * le resolver dédié à chaque type d'effet. Il n’implémente aucune logique métier
 * en interne — toute la résolution est déléguée à des fichiers spécialisés.
 */

import { Injectable } from '@angular/core';
import { GameEffect } from './game-effect.model';
import { GameContextService } from '../context/game-context.service';
import { EventBusService } from '../events/event-bus.service';

// Résolveurs importés
import { resolveGainGold } from './resolvers/gold-effect.resolver';
import { resolveInjury } from './resolvers/injury-effect.resolver';
import { resolveFame } from './resolvers/fame-effect.resolver';
import { resolveTrait } from './resolvers/trait-effect.resolver';
import { resolveReputation } from './resolvers/reputation-effect.resolver';
import { TraitEngineService } from './trait-engine.service';
import { EffectTypes } from './effect-types';
import { resolveAddFatigue, resolveRecoverFatigue } from './resolvers/fatigue-effect.resolver';
import { resolveChangeMoral } from './resolvers/moral-effect.resolver';
import { GameEventTypes } from '../events/game-event-types';
import { resolveGainXP } from './resolvers/gain-xp-effect.resolver';
import { resolveGainPrestige } from './resolvers/gain-prestige-effect.resolver';
import { resolveSpendMaterials } from './resolvers/spend-materials-effect.resolver';
import { resolveGainMaterials } from './resolvers/gain-materials-effect.resolver';
import { resolveSpendGold } from './resolvers/spend-gold-effect.resolver';
import { resolveTriggerGameEvent } from './resolvers/trigger-game-event-effect.resolver';

@Injectable({ providedIn: 'root' })
export class EffectEngineService {
  constructor(
    private context: GameContextService,
    private eventBus: EventBusService,
    private traitEngine: TraitEngineService
  ) {}

  /**
   * Applique un tableau d’effets à la suite.
   */
  applyEffects(effects: GameEffect[]): void {
    for (const effect of effects) {
      this.applyEffect(effect);
    }
  }

  /**
   * Applique un effet individuel en appelant son resolver spécifique.
   */
  applyEffect(effect: GameEffect): void {
    // 1. Événement global de log
    this.eventBus.emit({
      type: GameEventTypes.GameEffectApplied,
      payload: { effectType: effect.type },
    });

    switch (effect.type) {
      // === ÉCONOMIE ===
      case EffectTypes.GainGold:
        return resolveGainGold(effect, this.context, this.eventBus);
      case EffectTypes.SpendGold:
        return resolveSpendGold(effect, this.context, this.eventBus);
      case EffectTypes.GainMaterials:
        return resolveGainMaterials(effect, this.context, this.eventBus);
      case EffectTypes.SpendMaterials:
        return resolveSpendMaterials(effect, this.context, this.eventBus);

      // === FAME / REPUTATION / PRESTIGE ===
      case EffectTypes.GainFame:
        return resolveFame(effect, this.context, this.eventBus);
      case EffectTypes.ChangeReputation:
        return resolveReputation(effect, this.context, this.eventBus);
      case EffectTypes.GainPrestige:
        return resolveGainPrestige(effect, this.context, this.eventBus);

      // === STATS & CONDITIONS ===
      case EffectTypes.AddFatigue:
        return resolveAddFatigue(effect, this.context, this.eventBus);
      case EffectTypes.RecoverFatigue:
        return resolveRecoverFatigue(effect, this.context, this.eventBus);
      case EffectTypes.ChangeMoral:
        return resolveChangeMoral(effect, this.context, this.eventBus);
      case EffectTypes.GainXP:
        return resolveGainXP(effect, this.context, this.eventBus);

      // === TRAITS ===
      case EffectTypes.GainTrait:
        return resolveTrait(effect, this.traitEngine, this.eventBus);
      case EffectTypes.Injury:
        return resolveInjury(effect, this.traitEngine, this.eventBus);

      // === SYSTEME ===
      case EffectTypes.TriggerGameEvent:
        return resolveTriggerGameEvent(effect, this.context, this.eventBus);


      default:
        console.warn('[EffectEngine] Effet inconnu :', effect.type);
        return;
    }
  }
}



export function provideEffects() {
  return {
    provide: EffectEngineService,
    useClass: EffectEngineService,
  };
}
