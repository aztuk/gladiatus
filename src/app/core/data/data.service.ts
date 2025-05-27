/**
 * Ce service centralise le chargement de tous les fichiers JSON de données.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TraitDefinition } from '../models/trait.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  /**
   * Charge la liste des traits depuis /assets/data/trait-pool.json
   */
  async loadTraitPool(): Promise<TraitDefinition[]> {
    return await firstValueFrom(
      this.http.get<TraitDefinition[]>('assets/data/trait-pool.json')
    );
  }
}
