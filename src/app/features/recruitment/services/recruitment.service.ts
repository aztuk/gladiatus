/**
 * Service Angular dédié à la génération de profils de gladiateurs candidats au recrutement.
 * Lit les JSON de configuration et applique des tirages pondérés.
 */

import { inject, Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { BaseStat, EquipSlot, Gladiator, GladiatorCandidate, GladiatorStatus, Origine, WeaponSkill } from '../../../core/models/gladiator.model';

import gladiatorPoolJson from '../../../../assets/data/gladiator-pool.json';
import { GladiatorPoolData, TraitSummary } from '../../../core/models/json/gladiator-pool.model';

import recruitmentJson from '../../../../assets/data/recruitment.config.json';
import { RecruitmentConfig } from '../../../core/models/json/recruitment-config.model';

import namePoolJson from '../../../../assets/data/name-pool.json';
import traitPoolJson from '../../../../assets/data/trait-pool.json';

import { NamePool } from '../../../core/models/json/name-pool.model';
import { TraitDefinition } from '../../../core/models/json/trait-pool.model';

import { EffectEngineService } from '../../../core/effects/effect-engine.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { GameEffect } from '../../../core/effects/game-effect.model';
import { EffectTypes } from '../../../core/effects/effect-types';
import { GameEventTypes } from '../../../core/events/game-event-types';
import { generateGladiatorCandidate } from '../utils/candidate-generator.utils';
import { GameContextService } from '../../../core/context/game-context.service';

const recruitmentConfig = recruitmentJson as RecruitmentConfig;
const gladiatorPool = gladiatorPoolJson as GladiatorPoolData;

@Injectable({ providedIn: 'root' })
export class RecruitmentService {

  private readonly effectEngine = inject(EffectEngineService);
  private readonly context = inject(GameContextService);
  private readonly bus = inject(EventBusService);

  public recruitCandidate(candidate: GladiatorCandidate): void {
    const glad = this.convertToGladiator(candidate);

    this.context.addGladiator(glad);

    this.executeRecruitment(glad, candidate.cost);

    if (candidate.trait) {
      this.effectEngine.applyEffects([
        {
          type: EffectTypes.GainTrait,
          targetId: glad.id,
          traitId: candidate.trait.traitId
        }
      ]);
    }
  }

  public generateCandidates(): GladiatorCandidate[] {
    const candidates: GladiatorCandidate[] = [];
    const count = recruitmentConfig.profilesPerDraw;

    for (let i = 0; i < count; i++) {
      candidates.push(this.generateSingleCandidate());
    }

    return candidates;
  }


  private convertToGladiator(candidate: GladiatorCandidate): Gladiator {
    return {
      id: candidate.id,
      avatarId: candidate.avatarId,
      name: candidate.name,
      origine: candidate.origine,
      statut: GladiatorStatus.Disponible,
      stats: candidate.baseStats, // ✅ prise directe depuis le candidat
      weaponSkills: candidate.weaponSkills,
      equipement: {},
      celebrité: 0,
      traits: [],
      fatigue: 0,
      fatigueMax: 100,
      moral: 100,
      virtusMultiplier: candidate.virtus
    };
  }


  /**
   * Applique les effets nécessaires au recrutement :
   * - Dépense d’or
   * - Création du gladiateur
   * - Emission d’un GameEvent transverse
   */
  private executeRecruitment(gladiator: Gladiator, cost: number): void {
    const effects: GameEffect[] = [
      {
        type: EffectTypes.SpendGold,
        amount: cost
      },
      {
        type: EffectTypes.TriggerGameEvent,
        event: {
          type: GameEventTypes.GladiatorRecruited,
          payload: { gladiatorId: gladiator.id }
        }
      }
    ];

    this.effectEngine.applyEffects(effects);
  }

  private generateSingleCandidate(): GladiatorCandidate {

    return generateGladiatorCandidate(
      recruitmentConfig,
      gladiatorPool,
      namePoolJson as NamePool,
      traitPoolJson as TraitDefinition[]
    );
  }
}
