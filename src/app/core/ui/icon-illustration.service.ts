/**
 * Service global permettant d’accéder aux définitions d’icônes illustrées (PNG)
 * à partir de leur identifiant logique. Sert de couche d’abstraction entre le système
 * de design et l’utilisation dans les composants Angular ou injecteurs de contenu.
 */

import { Injectable } from '@angular/core';
import { ICON_ILLUSTRATION_MAP, IconIllustrationDefinition, IconIllustrationId } from '../../components/icon/icon-illustration-map.config';

@Injectable({
  providedIn: 'root'
})
export class IconIllustrationService {
  /**
   * Renvoie la définition complète d’une icône à partir de son identifiant.
   * @param id - L’identifiant logique de l’icône
   * @returns L’objet de définition associé (src, alt, etc.)
   */
  getDefinition(id: IconIllustrationId): IconIllustrationDefinition {
    return ICON_ILLUSTRATION_MAP[id];
  }

  /**
   * Renvoie uniquement le chemin de l’icône illustrée.
   * @param id - L’identifiant de l’icône
   * @returns Le chemin vers le fichier PNG
   */
  getSrc(id: IconIllustrationId): string {
    return ICON_ILLUSTRATION_MAP[id].src;
  }

  /**
   * Renvoie le texte alternatif (accessibilité).
   */
  getAlt(id: IconIllustrationId): string {
    return ICON_ILLUSTRATION_MAP[id].alt;
  }

  /**
   * Renvoie une classe CSS optionnelle si définie.
   */
  getCssClass(id: IconIllustrationId): string | undefined {
    return ICON_ILLUSTRATION_MAP[id].class;
  }

  /**
   * Vérifie si une icône est définie (utile pour valider une clé avant injection).
   */
  exists(id: string): id is IconIllustrationId {
    return id in ICON_ILLUSTRATION_MAP;
  }
}
