/**
 * Origines culturelles possibles des gladiateurs.
 */
export enum Origine {
  Gaulois = 'gaulois',
  Romain = 'romain',
  Grec = 'grec'
}

/**
 * Statut global du gladiateur (impacte sa disponibilité).
 */
export enum GladiatorStatus {
  Disponible = 'disponible',
  Blesse = 'blesse',
  Indisponible = 'indisponible',
  Affecte = 'affecte'
}

/**
 * Types de statistiques générales du gladiateur (valeurs de 0 à 20).
 */
export enum BaseStat {
  Attack = 'attack',               // Dégâts de fatigue infligés
  Defense = 'defense',             // Réduction des dégâts subis
  Vitesse = 'vitesse'      ,      // Fréquence d’attaque (affecte initiative ou tour)
  Precision = 'precision',         // % de chance de toucher
  Critical = 'critical',           // % de chance de double dégâts
  Spectaculaire = 'spectaculaire',  // % de chance d’un effet spécial (à renommer si besoin)
}

/**
 * Types de compétence spécifiques aux armes (valeurs de 0 à 20).
 */
export enum WeaponSkill {
  Distance = 'distance',       // Arc, fronde, etc.
  Tranchante = 'tranchante',   // Glaive, épée...
  Contondante = 'contondante', // Gourdin, marteau...
  Perçante = 'perçante'        // Trident, lance...
}

/**
 * Emplacements d’équipement (slots).
 */
export enum EquipSlot {
  Armure = 'armure',
  Casque = 'casque',
  Accessoire = 'accessoire'
}

/**
 * Représente un gladiateur jouable dans le Ludus.
 * Tous les champs sont data-driven et utilisés par les moteurs de progression, effet, combat...
 */

import { TraitInstance } from './trait.model';

export interface Gladiator {
  id: string;
  avatarId: number;
  name: string;
  origine: Origine;
  statut: GladiatorStatus;

  /** Valeurs de base du gladiateur (0 à 20 par stat) */
  stats: Partial<Record<BaseStat, number>>;

  /** Compétence par type d’arme (0 à 20) */
  weaponSkills: Partial<Record<WeaponSkill, number>>;

  /** Équipement équipé dans les emplacements disponibles */
  equipement: Partial<Record<EquipSlot, string>>;

  /** Score de célébrité visible (0–20) */
  celebrité: number;

  /** Traits actifs (blessures, buffs, etc.) */
  traits: TraitInstance[];

  /** Fatigue accumulée (0 à fatigueMax) */
  fatigue: number;
  fatigueMax: number;

  /** Moral actuel (peut varier par effet ou événement) */
  moral: number;

  /** Potentiel d’évolution invisible (apprentissage accéléré) */
  virtusMultiplier: number;
  
  rarity: string;
}

/**
 * Représente un gladiateur proposé dans le panel de recrutement, avant transformation en Gladiator complet.
 */
export interface GladiatorCandidate {
  id: string;
  avatarId: number;
  name: string;
  origine: Origine;
  baseStats: Partial<Record<BaseStat, number>>;
  weaponSkills: Partial<Record<WeaponSkill, number>>;
  trait?: TraitInstance; // ✅ Remplace traitId
  virtus: number;
  rarity: string;
  cost: number;
}

/**
 * État individuel d’un gladiateur (hors équipement ou visuel).
 */
export interface GladiatorState {
  /** Score de célébrité visible (0–20) */
  fame: number;

  /** Fatigue actuelle (0 à N) */
  fatigue: number;

  /** Moral (0 à 20) */
  moral: number;

  /** Virtus révélé ? */
  virtusRevealed?: boolean;

  /** XP par compétence */
  xp: Record<string, number>;

  /** Traits actifs (blessures, buffs, malus...) */
  traits: TraitInstance[];
}
