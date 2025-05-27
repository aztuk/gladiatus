/**
 * Fonction utilitaire permettant d’enrichir dynamiquement une string contenant des balises
 * logiques (ex: [gold]) en icônes illustrées réelles via <img>.
 */

import { ICON_ILLUSTRATION_MAP, IconIllustrationId } from "../../../components/icon/icon-illustration-map.config";


/**
 * Injecte les images dans une chaîne de texte contenant des identifiants d’icône entre crochets.
 * Ex : "Vous avez gagné [gold] et subi [injury_back]" → string HTML avec balises <img>
 */
export function injectIllustrations(input: string): string {
  return input.replace(/\[([a-zA-Z0-9_]+)\]/g, (_, rawId: string) => {
    const id = rawId as IconIllustrationId;
    const def = ICON_ILLUSTRATION_MAP[id];

    if (!def) return `[${rawId}]`; // fallback visuel

    const size = def.size || 'sm';
    const classAttr = `icon-${size} ${def.class ?? ''}`.trim();
    const escapedAlt = def.alt.replace(/"/g, '&quot;');

    return `<img src="${def.src}" alt="${escapedAlt}" class="${classAttr}" />`;
  });
}
