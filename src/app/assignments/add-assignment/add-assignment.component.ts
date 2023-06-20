import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Matiere } from '../matiere.model';
import { MatieresService } from 'src/app/shared/matiere.service';
import { fileUrl } from 'src/app/shared/utils';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit{
  fileUrl = fileUrl;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  matieres: Matiere[] = [];

  //formulaire
  choosenMatiere: Matiere|undefined;
  nom: string|undefined;
  dateDeRendu: Date|undefined;


  constructor(private dialogRef : MatDialogRef<AddAssignmentComponent>,
    public _formBuilder : FormBuilder,
    private matiereService: MatieresService){

  }

  ngOnInit(): void {
    this.getMatieres();
  }

  getMatieres(){
    this.matiereService.getMatieres()
      .subscribe(matiere => {
        this.matieres = matiere;
      })
  }

  onNoClick(){
    this.dialogRef.close();
  }

  clickMatiere(){

  }
}
