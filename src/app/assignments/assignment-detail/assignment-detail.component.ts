import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { fileUrl } from 'src/app/shared/utils';
import { Role } from 'src/app/shared/user.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?: Assignment;
  fileUrl = fileUrl;

  // mode notation
  notingMode = false;
  note :number|undefined;
  remarque = "";
  inputError: any = {};

  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService) { }

  ngOnInit(): void {
    // appelée avant le rendu du composant
    // on va chercher l'id dans l'url active
    // en mettant + on force la conversion en number
    const id = this.route.snapshot.params['id'];
    console.log("Dans le ngOnInit de detail, id = " + id);

    // on va chercher l'assignment à afficher
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
      });
  }

  onDeleteAssignment() {
    if (!this.assignmentTransmis) return;

    console.log("Suppression de l'assignment " + this.assignmentTransmis.nom);

    // on demande au service la suppression de l'assignment
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message);
        // Pour cacher le detail, on met l'assignment à null
        this.assignmentTransmis = undefined;

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      });

  }

  onAssignmentRendu() {
    if (!this.assignmentTransmis) return;

    if(!this.note) {
      this.inputError.note = "Insérez une note.";
      return;
    }else if(this.note <0 || this.note > 20){
      this.inputError.note = "La note doit être entre 0 et 20";
      return;
    }

    this.assignmentTransmis.rendu = true;
    this.assignmentTransmis.note = this.note;
    this.assignmentTransmis.remarques = this.remarque;

    // on appelle le service pour faire l'update
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        this.notingMode=false;
        this.inputError = {};
        console.log(message);
      });
  }

  onEditAssignment() {
    // navigation vers la page edit
    // équivalent à "/assignment/2/edit" par exemple
    // path = "/assignment/" + this.assignmentTransmis?.id + "/edit";
    // this.router.navigate([path]);
    // c'est pour vous montrer la syntaxe avec [...]
    this.router.navigate(["/assignments", this.assignmentTransmis?._id, "edit"]);
  }

  onAssignmentHand(){
    this.notingMode = !this.notingMode;
  }

  isLogged() {
    // renvoie si on est loggé ou pas
    return this.authService.isAuthenticated();
  }

  isAdmin(){
   return this.authService.isAuthorized([Role.Admin])
  }
}
