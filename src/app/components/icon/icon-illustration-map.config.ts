import { BaseStat, Origine } from "../../core/models/gladiator.model"
import { FactionId } from "../../core/models/reputation.model"


export type IconIllustrationId =
  | 'gold'
  | 'prestige'
  | 'materials'
  | 'attack'
  | 'defense'
  | 'precision'
  | 'critical'
  | 'speed'
  | 'spectacular'
  | 'empereur'
  | 'army'
  | 'peuple'
  | 'praticien'
  | 'grec'
  | 'romain'
  | 'gaulois'
  // etc.

export interface IconIllustrationDefinition {
  src: string
  alt: string
  size?: 'xs' | 'md' | 'md' | 'lg'
  class?: string // ex: pour forcer un fond sombre ou un encadré
}


export const ICON_ILLUSTRATION_MAP: Record<IconIllustrationId, IconIllustrationDefinition> = {
  gold: {
    src: 'assets/ui/icons/resources/gold.png',
    alt: 'Or',
    size: 'md'
  },
  prestige: {
    src: 'assets/ui/icons/resources/prestige.png',
    alt: 'Prestige',
    size: 'md'
  },
  materials: {
    src: 'assets/ui/icons/resources/materials.png',
    alt: 'Matériaux',
    size: 'md'
  },

  // Stats
  attack: {
    src: 'assets/ui/icons/stats/attack.png',
    alt: 'Matériaux',
    size: 'md'
  },
  defense: {
    src: 'assets/ui/icons/stats/defense.png',
    alt: 'Matériaux',
    size: 'md'
  },
  precision: {
    src: 'assets/ui/icons/stats/precision.png',
    alt: 'Matériaux',
    size: 'md'
  },
  critical: {
    src: 'assets/ui/icons/stats/critical.png',
    alt: 'Matériaux',
    size: 'md'
  },
  speed: {
    src: 'assets/ui/icons/stats/speed.png',
    alt: 'Matériaux',
    size: 'md'
  },
  spectacular: {
    src: 'assets/ui/icons/stats/spectacular.png',
    alt: 'Matériaux',
    size: 'md'
  }

  // Factions
  ,
  empereur: {
    src: 'assets/ui/icons/faction/empereur.png',
    alt: 'Empereur',
    size: 'lg'
  },
  army: {
    src: 'assets/ui/icons/faction/army.png',
    alt: 'Empereur',
    size: 'lg'
  },
  peuple: {
    src: 'assets/ui/icons/faction/peuple.png',
    alt: 'Empereur',
    size: 'lg'
  },
  praticien: {
    src: 'assets/ui/icons/faction/praticien.png',
    alt: 'Empereur',
    size: 'lg'
  }

  // Origines
  ,
  grec: {
    src: 'assets/ui/icons/origines/grec.png',
    alt: 'Empereur',
    size: 'lg'
  },
  gaulois: {
    src: 'assets/ui/icons/origines/gaulois.png',
    alt: 'Empereur',
    size: 'lg'
  },
  romain: {
    src: 'assets/ui/icons/origines/romain.png',
    alt: 'Empereur',
    size: 'lg'
  }
}

/**
 * Mapping entre chaque statistique de base (`BaseStat`) et l’identifiant
 * d’icône illustrée (PNG) utilisé dans l’interface (profil, HUD, combat...).
 */



export const BASE_STAT_ICON_MAP: Record<BaseStat, IconIllustrationId> = {
  attack: 'attack',
  defense: 'defense',
  precision: 'precision',       // ← prévoir les fichiers PNG correspondants
  critical: 'critical',
  vitesse: 'speed',
  spectaculaire: 'spectacular'
};


export const FACTION_ICON_MAP: Record<FactionId, IconIllustrationId> = {
  armee: 'army',
  empereur: 'empereur',
  patriciens: 'praticien',
  peuple: 'peuple'
};


export const ORIGIN_ICON_MAP: Record<Origine, IconIllustrationId> = {
  grec: 'grec',
  gaulois: 'gaulois',
  romain: 'romain'
};
