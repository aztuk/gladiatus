/**
 * Service central de debug/log système.
 * Permet d’afficher un historique lisible des effets déclenchés ou événements visibles côté joueur.
 * Utilisé par le HUD (hud-log) pour suivre les changements.
 */

import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DebugService {
  /**
   * Signal contenant les messages système les plus récents.
   */
  private readonly logs = signal<string[]>([]);

  /**
   * Nombre maximum de logs conservés en mémoire.
   */
  private readonly MAX_LOGS = 50;

  /**
   * Ajoute un nouveau message au journal.
   * @param message - Texte brut à afficher dans le HUD log
   */
  pushLog(message: string) {
    const current = this.logs();
    const updated = [...current, message];
    if (updated.length > this.MAX_LOGS) updated.shift();
    this.logs.set(updated);
  }

  /**
   * Renvoie le signal observable des logs récents.
   */
  getRecentLogs(): Signal<string[]> {
    return this.logs;
  }
}
