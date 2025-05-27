import { GameEventTypes } from './game-event-types';

export type GameEvent =
  // === CYCLE ===
  | { type: typeof GameEventTypes.CycleStarted; payload: { cycle: number } }
  | { type: typeof GameEventTypes.CycleEnded; payload: { cycle: number } }

  // === GLADIATEUR ===
  | { type: typeof GameEventTypes.GladiatorRecruited; payload: { gladiatorId: string } }
  | { type: typeof GameEventTypes.GladiatorDied; payload: { gladiatorId: string } }
  | { type: typeof GameEventTypes.GladiatorLevelUp; payload: { gladiatorId: string; newLevel: number } }

  // === TRAITS & BLESSURES ===
  | { type: typeof GameEventTypes.TraitApplied; payload: { gladiatorId: string; traitId: string } }
  | { type: typeof GameEventTypes.TraitExpired; payload: { gladiatorId: string; traitId: string } }
  | { type: typeof GameEventTypes.TraitGained; payload: { gladiatorId: string; traitId: string } }
  | { type: typeof GameEventTypes.TraitLost; payload: { gladiatorId: string; traitId: string } }
  | { type: typeof GameEventTypes.InjuryApplied; payload: { gladiatorId: string; injuryId: string } }
  | { type: typeof GameEventTypes.InjuryRecovered; payload: { gladiatorId: string; injuryId: string } }
  | { type: typeof GameEventTypes.VirtusVisible; payload: { gladiatorId: string } }

  // === STATS & CONDITIONS ===
  | { type: typeof GameEventTypes.MoralChanged; payload: { gladiatorId: string; amount: number } }
  | { type: typeof GameEventTypes.FatigueChanged; payload: { gladiatorId: string; delta: number } }
  | { type: typeof GameEventTypes.FatigueRecovered; payload: { gladiatorId: string; delta: number } }
  | { type: typeof GameEventTypes.XP_Gained; payload: { gladiatorId: string; skill: string; xp: number } }

  // === ÉCONOMIE ===
  | { type: typeof GameEventTypes.GoldGained; payload: { amount: number } }
  | { type: typeof GameEventTypes.GoldSpent; payload: { amount: number } }
  | { type: typeof GameEventTypes.MaterialsGained; payload: { amount: number; materialId: string } }
  | { type: typeof GameEventTypes.MaterialsSpent; payload: { amount: number; materialId: string } }
  | { type: typeof GameEventTypes.FameChanged; payload: { gladiatorId: string; amount: number } }
  | { type: typeof GameEventTypes.PrestigeChanged; payload: { amount: number } }

  // === ÉVÉNEMENTS GLOBAUX ===
  | { type: typeof GameEventTypes.GameEffectApplied; payload: { effectType: string } }
  | { type: typeof GameEventTypes.GameEventTriggered; payload: { eventId: string } }
  | { type: typeof GameEventTypes.ScriptedEventStarted; payload: { eventId: string } }
  | { type: typeof GameEventTypes.ScriptedEventResolved; payload: { eventId: string } }
  | { type: typeof GameEventTypes.RandomEventTriggered; payload: { seed: number; eventId: string } }

  // === FACTIONS ===
  | { type: typeof GameEventTypes.FactionReputationChanged; payload: { faction: string; amount: number } }
  | { type: typeof GameEventTypes.FactionImpressed; payload: { faction: string } }
  | { type: typeof GameEventTypes.FactionAngered; payload: { faction: string } }

  // === SYSTÈME / DEV ===
  | { type: typeof GameEventTypes.GameInitialized; payload: {} }
  | { type: typeof GameEventTypes.GameReset; payload: {} }
  | { type: typeof GameEventTypes.SeedInjected; payload: { seed: string } }
  | { type: typeof GameEventTypes.DebugEffectInjected; payload: { effectType: string } }
  | { type: typeof GameEventTypes.ContextLogUpdated; payload: { source: string } }
  | { type: typeof GameEventTypes.UIRefreshRequested; payload: {} };
