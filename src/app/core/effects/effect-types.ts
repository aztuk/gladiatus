/**
 * Liste centralisée de tous les types d'effets que peut recevoir le moteur d'effets.
 * Chaque effet doit avoir un résolveur correspondant dans `core/effects/resolvers`.
 */

export const EffectTypes = {
  // === ÉCONOMIE ===
  GainGold: 'gain_gold',
  SpendGold: 'spend_gold',
  GainMaterials: 'gain_materials',
  SpendMaterials: 'spend_materials',

  // === RÉPUTATION / PRESTIGE / FAME ===
  GainFame: 'gain_fame',
  ChangeReputation: 'reputation_change',
  GainPrestige: 'gain_prestige',

  // === STATS / CONDITIONS ===
  AddFatigue: 'add_fatigue',
  RecoverFatigue: 'recover_fatigue',
  ChangeMoral: 'change_moral',
  GainXP: 'gain_xp',

  // === TRAITS ===
  GainTrait: 'gain_trait',
  LoseTrait: 'lose_trait',
  Injury: 'injury',
  RecoverInjury: 'recover_injury',
  RevealVirtus: 'reveal_virtus',

  // === NARRATION / SYSTÈMES GLOBAUX ===
  TriggerGameEvent: 'trigger_game_event',
  ApplyScriptedEvent: 'apply_scripted_event',
  ApplyRandomEvent: 'apply_random_event',
} as const;

export type EffectType = typeof EffectTypes[keyof typeof EffectTypes];

