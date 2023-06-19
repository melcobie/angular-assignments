import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment } from '../assignment.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-assignment-modal',
  templateUrl: './add-assignment-modal.component.html',
  styleUrls: ['./add-assignment-modal.component.css']
})
export class AddAssignmentModalComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private dialogRef : MatDialogRef<AddAssignmentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _formBuilder : FormBuilder){

  }

  onNoClick(){
    this.dialogRef.close();
  }
}
