import { Matiere } from "./matiere.model";

export class Assignment {
    _id!: string;
    id!: number;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    matiere!: Matiere;
    eleve!: string;
    note!: number;
    remarque!: string;
}

