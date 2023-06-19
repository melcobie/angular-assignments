import { UserInfo } from "../shared/user.model";
import { Matiere } from "./matiere.model";

export class Assignment {
    _id!: string;
    id!: number;
    nom!: string;
    dateDeRendu!: Date;
    rendu!: boolean;
    matiere!: Matiere;
    eleve!: UserInfo;
    note!: number;
    remarques!: string;
}

