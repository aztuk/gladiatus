import { Origine } from '../gladiator.model';

/**
 * Représente la structure du fichier `name-pool.json`.
 * Chaque origine possède une liste de prénoms.
 */
export type NamePool = Record<Origine, string[]>;
