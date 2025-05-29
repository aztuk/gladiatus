import { BaseStat, Origine, WeaponSkill } from "../../core/models/gladiator.model"
import { FactionId } from "../../core/models/reputation.model"
import { TraitType } from "../../core/models/trait.model"


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
  | 'blessure'
  | 'malus'
  | 'buff'
  | 'narratif'
  | 'distance'
  | 'tranchante'
  | 'contondante'
  | 'perçante'
  // etc.

export interface IconIllustrationDefinition {
  src: string
  alt: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
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
    size: 'xs'
  },
  defense: {
    src: 'assets/ui/icons/stats/defense.png',
    alt: 'Matériaux',
    size: 'xs'
  },
  precision: {
    src: 'assets/ui/icons/stats/precision.png',
    alt: 'Matériaux',
    size: 'xs'
  },
  critical: {
    src: 'assets/ui/icons/stats/critical.png',
    alt: 'Matériaux',
    size: 'xs'
  },
  speed: {
    src: 'assets/ui/icons/stats/speed.png',
    alt: 'Matériaux',
    size: 'xs'
  },
  spectacular: {
    src: 'assets/ui/icons/stats/spectacular.png',
    alt: 'Matériaux',
    size: 'xs'
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

  // Traits type
  ,
  blessure: {
    src: 'assets/ui/icons/traits/blessure.png',
    alt: 'Empereur',
    size: 'xs'
  },
  buff: {
    src: 'assets/ui/icons/traits/buff.png',
    alt: 'Empereur',
    size: 'xs'
  },
  malus: {
    src: 'assets/ui/icons/traits/malus.png',
    alt: 'Empereur',
    size: 'xs'
  },
  narratif: {
    src: 'assets/ui/icons/traits/narratif.png',
    alt: 'Empereur',
    size: 'xs'
  }

  // Weapon types
  ,
  distance: {
    src: 'assets/ui/icons/weaponType/distance.png',
    alt: 'Empereur',
    size: 'xs'
  },
  contondante: {
    src: 'assets/ui/icons/weaponType/contondante.png',
    alt: 'Empereur',
    size: 'xs'
  },
  tranchante: {
    src: 'assets/ui/icons/weaponType/tranchante.png',
    alt: 'Empereur',
    size: 'xs'
  },
  perçante: {
    src: 'assets/ui/icons/weaponType/perçante.png',
    alt: 'Empereur',
    size: 'xs'
  }
}

/**
 * Mapping entre chaque statistique de base (`BaseStat`) et l’identifiant
 * d’icône illustrée (PNG) utilisé dans l’interface (profil, HUD, combat...).
 */

export const WEAPONSKILL_ICON_MAP: Record<WeaponSkill, IconIllustrationId> = {
  distance: 'distance',
  contondante: 'contondante',
  tranchante: 'tranchante',       // ← prévoir les fichiers PNG correspondants
  perçante: 'perçante'
};

export const TRAIT_TYPE_ICON_MAP: Record<TraitType, IconIllustrationId> = {
  blessure: 'blessure',
  buff: 'buff',
  malus: 'malus',
  narratif: 'narratif'
};

export const BASE_STAT_ICON_MAP: Record<BaseStat, IconIllustrationId> = {
  attack: 'attack',
  defense: 'defense',
  precision: 'precision',       // ← prévoir les fichiers PNG correspondants
  critical: 'critical',
  vitesse: 'speed',
  spectaculaire: 'spectacular'
};
export const BASE_STAT_LABEL_MAP: Record<BaseStat, string> = {
  attack: 'Attaque',
  defense: 'Défense',
  precision: 'Précision',
  critical: 'Critique',
  vitesse: 'Vitesse',
  spectaculaire: 'Spectacle'
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


