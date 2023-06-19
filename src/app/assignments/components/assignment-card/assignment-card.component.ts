import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Assignment } from '../../assignment.model';
import { fileUrl } from 'src/app/shared/utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnChanges{
  	@Input() assignment: Assignment|undefined;
    chipStyle:any = {};

    fileUrl = fileUrl;

    constructor(private route: Router){}

    ngOnChanges(changes: SimpleChanges) {
      if (changes['assignment']) {
        let currentValue = changes['assignment'].currentValue;
        this.chipStyle = {
          backgroundColor: 'white',
          color: currentValue.matiere.couleur,
          borderColor: currentValue.matiere.couleur
        };
      }
    }

    goToDetails(){
      this.route.navigate(["/assignments", this.assignment?._id]);
    }

}
