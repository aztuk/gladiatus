/**
 * Mapping centralisé des icônes Font Awesome utilisées dans l’interface.
 * Ici : uniquement les contrôles de l’horloge (play, pause, vitesse).
 */

import {
  faPlay,
  faPause,
  faForward,
  faAnglesRight,
  faForwardStep,
  faAngleDoubleRight,
  faRotateRight
} from '@fortawesome/free-solid-svg-icons';

import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type FaIconId = 'play' | 'pause' | 'x2' | 'x3';

export const FA_ICON_MAP: Record<FaIconId, IconDefinition> = {
  play: faPlay,
  pause: faPause,
  x2: faForward,
  x3: faRotateRight // Même icône mais tu pourras la styliser différemment si besoin
};
