/**
 * Configuration des factions : noms, icônes, traductions...
 */

import { IconIllustrationId } from "../../components/icon/icon-illustration-map.config";

export type FactionId = 'empereur' | 'patriciens' | 'peuple' | 'armee';

export interface FactionDefinition {
  id: FactionId;
  label: string;
  icon: IconIllustrationId;
}

export const ALL_FACTIONS: FactionDefinition[] = [
  { id: 'empereur', label: 'Empereur', icon: 'empereur' },
  { id: 'patriciens', label: 'Patriciens', icon: 'praticien' },
  { id: 'peuple', label: 'Peuple', icon: 'peuple' },
  { id: 'armee', label: 'Armée', icon: 'army' }
];
