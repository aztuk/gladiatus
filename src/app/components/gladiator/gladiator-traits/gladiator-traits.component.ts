/* =============================
 * 🎯 Composant : GladiatorTraitsComponent
 * Affiche les traits actifs (buffs, blessures, etc.) d'un gladiateur.
 * ============================= */

// gladiator-traits.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraitInstance, TraitDefinition, TraitType } from '../../../core/models/trait.model';
import traitPool from '../../../../assets/data/trait-pool.json';
import { IconComponent } from "../../icon/icon-illustration/icon.component";
import { TRAIT_TYPE_ICON_MAP } from '../../icon/icon-illustration-map.config';

@Component({
  selector: 'app-gladiator-traits',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './gladiator-traits.component.html',
  styleUrls: ['./gladiator-traits.component.scss']
})
export class GladiatorTraitsComponent implements OnInit {
  @Input() traits: TraitInstance[] = [];

  definitions: Record<string, TraitDefinition> = {};

  iconMap = TRAIT_TYPE_ICON_MAP;

  ngOnInit(): void {
    for (const def of traitPool as TraitDefinition[]) {
      this.definitions[def.id] = def;
    }
  }

  getLabel(trait: TraitInstance): string {
    return this.definitions[trait.traitId]?.label || trait.traitId;
  }

  getType(trait: TraitInstance): TraitType {
    return this.definitions[trait.traitId]?.type || 'narratif';
  }

  getRemaining(trait: TraitInstance): string {
    return `(${trait.remaining}t)`;
  }
}
