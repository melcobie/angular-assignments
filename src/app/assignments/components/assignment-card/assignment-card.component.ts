import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Assignment } from '../../assignment.model';

@Component({
  selector: 'app-assignment-card',
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.css']
})
export class AssignmentCardComponent implements OnChanges{
  	@Input() assignment: Assignment|undefined;
    chipStyle:any = {};

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

}
