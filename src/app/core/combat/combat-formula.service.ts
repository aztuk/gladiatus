/**
 * Service transverse — Calcule toutes les formules liées au combat.
 * Utilisé par : systèmes de combat, recrutement, interfaces HUD.
 */

import { Injectable } from '@angular/core';
import { WeaponSkill } from '../models/gladiator.model';

@Injectable({ providedIn: 'root' })
export class CombatFormulaService {

  /**
   * Calcule les dégâts par attaque selon l’attaque brute et la maîtrise d’arme.
   */
  calculateDamage(baseAttack: number, weaponSkill: number): number {
    return baseAttack * Math.sqrt(1 + weaponSkill / 10);
  }

  /**
   * Calcule les dégâts moyens par tour, en fonction de la vitesse.
   */
  calculateDamagePerTurn(baseAttack: number, weaponSkill: number, speed: number): number {
    return this.calculateDamage(baseAttack, weaponSkill) * (speed / 100);
  }

  /**
   * Retourne l’arme la mieux maîtrisée par le gladiateur.
   */
  getBestWeaponSkill(
    skills: Partial<Record<WeaponSkill, number>>
  ): { skill: WeaponSkill; value: number } {
    let best: WeaponSkill = WeaponSkill.Tranchante; // par défaut
    let max = 0;

    for (const skill in skills) {
      const value = skills[skill as WeaponSkill] ?? 0;
      if (value > max) {
        max = value;
        best = skill as WeaponSkill;
      }
    }

    return { skill: best, value: max };
  }
}
