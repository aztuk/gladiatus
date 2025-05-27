import { GameEvent } from './game-event.model';
import { GameEventTypes } from './game-event-types';

export function formatGameEventLog(event: GameEvent): string {
  switch (event.type) {
    // === CYCLE ===
    case GameEventTypes.CycleStarted:
      return `Cycle ${event.payload.cycle} démarré`;
    case GameEventTypes.CycleEnded:
      return `Fin du cycle ${event.payload.cycle}`;

    // === GLADIATEUR ===
    case GameEventTypes.GladiatorRecruited:
      return `Gladiateur ${event.payload.gladiatorId} recruté`;
    case GameEventTypes.GladiatorDied:
      return `Gladiateur ${event.payload.gladiatorId} est mort`;
    case GameEventTypes.GladiatorLevelUp:
      return `Gladiateur ${event.payload.gladiatorId} passe niveau ${event.payload.newLevel}`;

    // === TRAITS & BLESSURES ===
    case GameEventTypes.TraitApplied:
      return `Effet appliqué : ${event.payload.traitId} à ${event.payload.gladiatorId}`;
    case GameEventTypes.TraitExpired:
      return `Effet expiré : ${event.payload.traitId} sur ${event.payload.gladiatorId}`;
    case GameEventTypes.TraitGained:
      return `Gladiateur ${event.payload.gladiatorId} a gagné le trait ${event.payload.traitId}`;
    case GameEventTypes.TraitLost:
      return `Gladiateur ${event.payload.gladiatorId} a perdu le trait ${event.payload.traitId}`;
    case GameEventTypes.InjuryApplied:
      return `Blessure ${event.payload.injuryId} infligée à ${event.payload.gladiatorId}`;
    case GameEventTypes.InjuryRecovered:
      return `Blessure ${event.payload.injuryId} récupérée par ${event.payload.gladiatorId}`;
    case GameEventTypes.VirtusVisible:
      return `Vertus révélées pour ${event.payload.gladiatorId}`;

    // === STATS & CONDITIONS ===
    case GameEventTypes.MoralChanged:
      return `Moral modifié pour ${event.payload.gladiatorId} : ${formatSigned(event.payload.amount)}`;
    case GameEventTypes.FatigueChanged:
      return `Fatigue modifiée pour ${event.payload.gladiatorId} : ${formatSigned(event.payload.delta)}`;
    case GameEventTypes.FatigueRecovered:
      return `Fatigue récupérée par ${event.payload.gladiatorId} : ${event.payload.delta}`;
    case GameEventTypes.XP_Gained:
      return `${event.payload.gladiatorId} gagne ${event.payload.xp} XP en ${event.payload.skill}`;

    // === ÉCONOMIE ===
    case GameEventTypes.GoldGained:
      return `+${event.payload.amount} or`;
    case GameEventTypes.GoldSpent:
      return `-${event.payload.amount} or dépensés`;
    case GameEventTypes.MaterialsGained:
      return `+${event.payload.amount} ${event.payload.materialId}`;
    case GameEventTypes.MaterialsSpent:
      return `-${event.payload.amount} ${event.payload.materialId} utilisés`;
    case GameEventTypes.FameChanged:
      return `Renommée modifiée pour ${event.payload.gladiatorId} : ${formatSigned(event.payload.amount)}`;
    case GameEventTypes.PrestigeChanged:
      return `Prestige ${formatSigned(event.payload.amount)}`;

    // === ÉVÉNEMENTS GLOBAUX ===
    case GameEventTypes.GameEffectApplied:
      return `Effet appliqué:  ${event.payload.effectType}`;
    case GameEventTypes.GameEventTriggered:
      return `Événement déclenché : ${event.payload.eventId}`;
    case GameEventTypes.ScriptedEventStarted:
      return `Événement scripté commencé : ${event.payload.eventId}`;
    case GameEventTypes.ScriptedEventResolved:
      return `Événement résolu : ${event.payload.eventId}`;
    case GameEventTypes.RandomEventTriggered:
      return `Événement aléatoire : ${event.payload.eventId}`;

    // === FACTIONS ===
    case GameEventTypes.FactionReputationChanged:
      return `Réputation ${event.payload.faction} ${formatSigned(event.payload.amount)}`;
    case GameEventTypes.FactionImpressed:
      return `${event.payload.faction} est impressionnée`;
    case GameEventTypes.FactionAngered:
      return `${event.payload.faction} est en colère`;

    // === SYSTÈME / DEV ===
    case GameEventTypes.GameInitialized:
      return `Partie initialisée`;
    case GameEventTypes.GameReset:
      return `Réinitialisation du jeu`;
    case GameEventTypes.SeedInjected:
      return `Seed injectée : ${event.payload.seed}`;
    case GameEventTypes.DebugEffectInjected:
      return `Effet de debug injecté : ${event.payload.effectType}`;
    case GameEventTypes.ContextLogUpdated:
      return `Mise à jour du contexte : ${event.payload.source}`;
    case GameEventTypes.UIRefreshRequested:
      return `Rafraîchissement UI demandé`;

    default:
      return `⚠ Event inconnu`;
  }
}

function formatSigned(n: number): string {
  return n > 0 ? `+${n}` : `${n}`;
}
