import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  titre="Liste des devoirs à rendre";
  // les données à afficher
  assignmentsRendu:Assignment[] = [];
  assignmentsNonRendu:Assignment[]=[];
  // Pour la data table
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  // propriétés pour les assignments non rendus
  pageRendu: number=1;
  limitRendu: number=10;
  totalDocsRendu: number = 0;
  totalPagesRendu: number = 0;
  hasPrevPageRendu: boolean = false;
  prevPageRendu: number = 0;
  hasNextPageRendu: boolean = false;
  nextPageRendu: number = 0;
  //propriétés pour les assignments rendus
  pageNonRendu: number=1;
  limitNonRendu: number=10;
  totalDocsNonRendu: number = 0;
  totalPagesNonRendu: number = 0;
  hasPrevPageNonRendu: boolean = false;
  prevPageNonRendu: number = 0;
  hasNextPageNonRendu: boolean = false;
  nextPageNonRendu: number = 0;
;



  @ViewChild('scrollerRendu') scrollerRendu!: CdkVirtualScrollViewport;
  @ViewChild('scrollerNonRendu') scrollerNonRendu!: CdkVirtualScrollViewport;

  constructor(private assignmentsService:AssignmentsService,
              private ngZone: NgZone,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log("OnInit Composant instancié et juste avant le rendu HTML (le composant est visible dans la page HTML)");
    this.getAssignments();
  }

  ngAfterViewInit() {
    console.log("after view init");

    if(!this.scrollerRendu) return;

    // on s'abonne à l'évènement scroll de la liste
    this.scrollerRendu.elementScrolled()
    .pipe(
      tap(event => {
        //console.log(event);
      }),
      map(event => {
         return this.scrollerRendu.measureScrollOffset('bottom');
      }),
      tap(y => {
        //console.log("y = " + y);
      }),
      pairwise(),
      tap(([y1, y2]) => {
        //console.log("y1 = " + y1 + " y2 = " + y2);
      }),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 100;
      }),
      // Pour n'envoyer des requêtes que toutes les 200ms
      //throttleTime(200)
    )
    .subscribe((val) => {
      console.log("val = " + val);
      console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.pageRendu);
      this.ngZone.run(() => {
        if(!this.hasNextPageRendu) return;

        this.pageRendu = this.nextPageRendu;
        this.getAddAssignmentsRenduForScroll();
      });
    });
    //On s'abonne à l'abonnement scroll des non rendus
    this.scrollerNonRendu.elementScrolled()
    .pipe(
      tap(event => {
        //console.log(event);
      }),
      map(event => {
         return this.scrollerNonRendu.measureScrollOffset('bottom');
      }),
      tap(y => {
        //console.log("y = " + y);
      }),
      pairwise(),
      tap(([y1, y2]) => {
        //console.log("y1 = " + y1 + " y2 = " + y2);
      }),
      filter(([y1, y2]) => {
        return y2 < y1 && y2 < 100;
      }),
      // Pour n'envoyer des requêtes que toutes les 200ms
      //throttleTime(200)
    )
    .subscribe((val) => {
      console.log("val = " + val);
      console.log("je CHARGE DE NOUVELLES DONNEES page = " + this.pageRendu);
      this.ngZone.run(() => {
        if(!this.hasNextPageNonRendu) return;

        this.pageNonRendu = this.nextPageNonRendu;
        this.getAddAssignmentsNonRenduForScroll();
      });
    });
  }

  getAssignments() {
    console.log("On va chercher les assignments dans le service");

    this.assignmentsService.getAssignments(this.pageRendu, this.limitRendu,"rendu")
    .subscribe(data => {
      this.assignmentsRendu = data.docs;
      this.pageRendu = data.page;
      this.limitRendu = data.limit;
      this.totalDocsRendu = data.totalDocs;
      this.totalPagesRendu = data.totalPages;
      this.hasPrevPageRendu = data.hasPrevPage;
      this.prevPageRendu = data.prevPage;
      this.hasNextPageRendu = data.hasNextPage;
      this.nextPageRendu = data.nextPage;
    });
    this.assignmentsService.getAssignments(this.pageRendu, this.limitRendu,"nonRendu")
    .subscribe(data => {
      this.assignmentsNonRendu = data.docs;
      this.pageNonRendu = data.page;
      this.limitNonRendu = data.limit;
      this.totalDocsNonRendu = data.totalDocs;
      this.totalPagesNonRendu = data.totalPages;
      this.hasPrevPageNonRendu = data.hasPrevPage;
      this.prevPageNonRendu = data.prevPage;
      this.hasNextPageNonRendu = data.hasNextPage;
      this.nextPageNonRendu = data.nextPage;
    });
  }

  getAddAssignmentsRenduForScroll() {
    this.assignmentsService.getAssignments(this.pageRendu, this.limitRendu,"rendu")
    .subscribe(data => {
      // au lieu de remplacer le tableau, on va concaténer les nouvelles données
      this.assignmentsRendu = this.assignmentsRendu.concat(data.docs);
      // ou comme ceci this.assignments = [...this.assignments, ...data.docs]
      //this.assignments = data.docs;
      this.pageRendu = data.page;
      this.limitRendu = data.limit;
      this.totalDocsRendu = data.totalDocs;
      this.totalPagesRendu = data.totalPages;
      this.hasPrevPageRendu = data.hasPrevPage;
      this.prevPageRendu = data.prevPage;
      this.hasNextPageRendu = data.hasNextPage;
      this.nextPageRendu = data.nextPage;

      console.log("Données ajoutées pour scrolling");
    });
  }

  getAddAssignmentsNonRenduForScroll() {
    this.assignmentsService.getAssignments(this.pageNonRendu, this.limitNonRendu,"nonRendu")
    .subscribe(data => {
      // au lieu de remplacer le tableau, on va concaténer les nouvelles données
      this.assignmentsNonRendu = this.assignmentsNonRendu.concat(data.docs);
      // ou comme ceci this.assignments = [...this.assignments, ...data.docs]
      //this.assignments = data.docs;
      this.pageNonRendu = data.page;
      this.limitNonRendu = data.limit;
      this.totalDocsNonRendu = data.totalDocs;
      this.totalPagesNonRendu = data.totalPages;
      this.hasPrevPageNonRendu = data.hasPrevPage;
      this.prevPageNonRendu = data.prevPage;
      this.hasNextPageNonRendu = data.hasNextPage;
      this.nextPageNonRendu = data.nextPage;

      console.log("Données ajoutées pour scrolling");
    });
  }

  addAssignment(){
    const dialogRef = this.dialog.open(AddAssignmentComponent, {
      height: '80%',
      width: '80%',
    })

    dialogRef.afterClosed().subscribe(result => {
      const newAssignment = new Assignment();
      newAssignment.nom = result.nom;
      newAssignment.dateDeRendu = result.dateDeRendu;
      newAssignment.matiere = result.choosenMatiere;
      this.assignmentsService.addAssignment(newAssignment)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(["/assignments", data._id]);
        });
    })
  }
}
