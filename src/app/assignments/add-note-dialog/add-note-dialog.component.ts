import { Component, Inject } from '@angular/core';
import { Assignment } from '../assignment.model';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent {
  note :number|undefined;
  remarque = "";
  inputError: any = {};

  noteFormControl = new FormControl('', [Validators.required,  Validators.min(0), Validators.max(20)])
  
  constructor(public dialogRef: DialogRef<AddNoteDialogComponent>, @Inject(DIALOG_DATA) public data: Assignment) {
  }
}
