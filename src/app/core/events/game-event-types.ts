/**
 * Liste centralisée des types d’événements système émis par le jeu.
 * Utilisée pour :
 * - éviter les erreurs de string dans les comparaisons
 * - standardiser les noms dans les logs et le EventBus
 * - faciliter l’autocomplétion dans l’éditeur
 */
export const GameEventTypes = {

  // === CYCLE ===
  CycleStarted: 'CYCLE_STARTED',
  CycleEnded: 'CYCLE_ENDED',

  // === GLADIATEUR ===
  GladiatorRecruited: 'GLADIATOR_RECRUITED',
  GladiatorDied: 'GLADIATOR_DIED',
  GladiatorLevelUp: 'GLADIATOR_LEVEL_UP',

  // === TRAITS & BLESSURES ===
  TraitApplied: 'TRAIT_APPLIED',
  TraitExpired: 'TRAIT_EXPIRED',
  TraitGained: 'TRAIT_GAINED',
  TraitLost: 'TRAIT_LOST',
  InjuryApplied: 'INJURY_APPLIED',
  InjuryRecovered: 'INJURY_RECOVERED',
  VirtusVisible: 'VIRTUS_VISIBLE',

  // === STATS & CONDITIONS ===
  MoralChanged: 'MORAL_CHANGED',
  FatigueChanged: 'FATIGUE_CHANGED',
  FatigueRecovered: 'FATIGUE_RECOVERED',
  XP_Gained: 'XP_GAINED',

  // === ÉCONOMIE ===
  GoldGained: 'GOLD_GAINED',
  GoldSpent: 'GOLD_SPENT',
  MaterialsGained: 'MATERIALS_GAINED',
  MaterialsSpent: 'MATERIALS_SPENT',
  FameChanged: 'FAME_CHANGED',
  PrestigeChanged: 'PRESTIGE_CHANGED',

  // === ÉVÉNEMENTS GLOBAUX ===
  GameEffectApplied: 'GAME_EFFECT_APPLIED',
  GameEventTriggered: 'GAME_EVENT_TRIGGERED',
  ScriptedEventStarted: 'SCRIPTED_EVENT_STARTED',
  ScriptedEventResolved: 'SCRIPTED_EVENT_RESOLVED',
  RandomEventTriggered: 'RANDOM_EVENT_TRIGGERED',

  // === FACTIONS ===
  FactionReputationChanged: 'FACTION_REPUTATION_CHANGED',
  FactionImpressed: 'FACTION_IMPRESSED',
  FactionAngered: 'FACTION_ANGERED',

  // === SYSTÈME / DEV ===
  GameInitialized: 'GAME_INITIALIZED',
  GameReset: 'GAME_RESET',
  SeedInjected: 'SEED_INJECTED',
  DebugEffectInjected: 'DEBUG_EFFECT_INJECTED',
  ContextLogUpdated: 'CONTEXT_LOG_UPDATED',
  UIRefreshRequested: 'UI_REFRESH_REQUESTED',
  
} as const;

/**
 * Type stricte représentant tous les noms d’événements disponibles.
 */
export type GameEventType = typeof GameEventTypes[keyof typeof GameEventTypes];



