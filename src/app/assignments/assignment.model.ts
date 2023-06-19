class Matiere{
 _id!: string;
 id!: string;
 nom!: string;
 prof!: string;
 photo!: string;
 couleur!: string;
}
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

