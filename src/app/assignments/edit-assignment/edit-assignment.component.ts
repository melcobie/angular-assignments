import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { fileUrl } from 'src/app/shared/utils';
import { Matiere } from '../matiere.model';
import { MatieresService } from 'src/app/shared/matiere.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
  fileUrl = fileUrl;

 assignment!: Assignment | undefined;
 matieres: Matiere[] = [];
 // associées aux champs du formulaire
 nomAssignment!: string;
 dateDeRendu!: Date;
 matiere!: Matiere;
 note!: number;
 remarque!: string;
 inputError: any = {};

 constructor(
   private assignmentsService: AssignmentsService,
   private matiereService: MatieresService,
   private route: ActivatedRoute,
   private router: Router
 ) {}

 ngOnInit(): void {
   this.getAssignment();
   this.getMatieres();
 }
 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = this.route.snapshot.params['id'];

  this.assignmentsService.getAssignment(id)
  .subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
    this.matiere = assignment.matiere;
    this.note = assignment.note;
    this.remarque = assignment.remarques;
  });
}

getMatieres(){
  this.matiereService.getMatieres()
    .subscribe(matiere => {
      this.matieres = matiere;
    })
}

onSaveAssignment() {
  if (!this.assignment) return;

  if(this.assignment.rendu){
    if(!this.note) {
      this.inputError.note = "Insérez une note.";
      return;
    }else if(this.note <0 || this.note > 20){
      this.inputError.note = "La note doit être entre 0 et 20";
      return;
    } 
  }
  

  // on récupère les valeurs dans le formulaire
  this.assignment = {
    ...this.assignment,
    nom: this.nomAssignment,
    dateDeRendu: this.dateDeRendu,
    matiere: this.matiere,
    note: this.note,
    remarques: this.remarque,
  }
  this.assignmentsService
    .updateAssignment(this.assignment)
    .subscribe((message) => {
      console.log(message);

      // navigation vers la home page
      this.router.navigate(['/home']);
    });
}
}
