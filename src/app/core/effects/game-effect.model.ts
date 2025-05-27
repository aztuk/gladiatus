import { GameEvent } from '../events/game-event.model';
import { FactionId } from '../models/reputation.model';
import { EffectTypes } from './effect-types';

/**
 * === ÉCONOMIE ===
 */
export interface GainGoldEffect {
  type: typeof EffectTypes.GainGold;
  amount: number;
}

export interface SpendGoldEffect {
  type: typeof EffectTypes.SpendGold;
  amount: number;
}

export interface GainMaterialsEffect {
  type: typeof EffectTypes.GainMaterials;
  amount: number;
  materialId: string;
}

export interface SpendMaterialsEffect {
  type: typeof EffectTypes.SpendMaterials;
  amount: number;
  materialId: string;
}

/**
 * === RÉPUTATION / PRESTIGE / FAME ===
 */
export interface GainFameEffect {
  type: typeof EffectTypes.GainFame;
  targetId: string;
  amount: number;
}

export interface GainPrestigeEffect {
  type: typeof EffectTypes.GainPrestige;
  amount: number;
}

export interface ReputationChangeEffect {
  type: typeof EffectTypes.ChangeReputation;
  faction: FactionId;
  amount: number;
}

/**
 * === STATS / CONDITIONS ===
 */
export interface AddFatigueEffect {
  type: typeof EffectTypes.AddFatigue;
  targetId: string;
  amount: number;
}

export interface RecoverFatigueEffect {
  type: typeof EffectTypes.RecoverFatigue;
  targetId: string;
  amount: number;
}

export interface ChangeMoralEffect {
  type: typeof EffectTypes.ChangeMoral;
  targetId: string;
  amount: number;
}

export interface GainXPEffect {
  type: typeof EffectTypes.GainXP;
  targetId: string;
  skill: string;
  xp: number;
}

/**
 * === TRAITS ===
 */
export interface GainTraitEffect {
  type: typeof EffectTypes.GainTrait;
  targetId: string;
  traitId: string;
}

export interface LoseTraitEffect {
  type: typeof EffectTypes.LoseTrait;
  targetId: string;
  traitId: string;
}

export interface InjuryEffect {
  type: typeof EffectTypes.Injury;
  targetId: string;
  injuryId: string;
}

export interface RecoverInjuryEffect {
  type: typeof EffectTypes.RecoverInjury;
  targetId: string;
  injuryId: string;
}

export interface RevealVirtusEffect {
  type: typeof EffectTypes.RevealVirtus;
  targetId: string;
}

/**
 * === NARRATION / SYSTÈMES GLOBAUX ===
 */
export interface TriggerGameEventEffect {
  type: typeof EffectTypes.TriggerGameEvent;
  event: GameEvent;
}

export interface ApplyScriptedEventEffect {
  type: typeof EffectTypes.ApplyScriptedEvent;
  eventId: string;
}

export interface ApplyRandomEventEffect {
  type: typeof EffectTypes.ApplyRandomEvent;
  poolId: string;
  seed?: number;
}

/**
 * Union complète des effets résolus par le moteur.
 */
export type GameEffect =
  | GainGoldEffect
  | SpendGoldEffect
  | GainMaterialsEffect
  | SpendMaterialsEffect
  | GainFameEffect
  | GainPrestigeEffect
  | ReputationChangeEffect
  | AddFatigueEffect
  | RecoverFatigueEffect
  | ChangeMoralEffect
  | GainXPEffect
  | GainTraitEffect
  | LoseTraitEffect
  | InjuryEffect
  | RecoverInjuryEffect
  | RevealVirtusEffect
  | TriggerGameEventEffect
  | ApplyScriptedEventEffect
  | ApplyRandomEventEffect
  | TriggerGameEventEffect;
