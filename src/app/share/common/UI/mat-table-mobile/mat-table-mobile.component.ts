import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

export type strucNew = {
  clave: string,
  valor: string
}

@Component({
  selector: 'app-mat-table-mobile',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardActions,FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, MatCheckboxModule],
  templateUrl: './mat-table-mobile.component.html',
  styleUrl: './mat-table-mobile.component.scss'
})


export class MatTableMobileComponent implements OnInit {

  @Input() title = '';
  @Input() subtitle = '';
  @Input() data: any;
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  dataNew: strucNew[] = [];

  constructor() {
  }

  ngOnInit(): void {
    Object.entries(this.data).forEach(([key, value]) => {
      this.dataNew.push({
        clave: `${key}`,
        valor: `${value}`
      });
    });
    this.dataNew.splice(0,1);
  }

  edit() {
    this.editEvent.emit(this.data)
  }

  delete() {
    this.deleteEvent.emit(this.data.id)
  }


  getChecked(value: any) {
    return value == 'true';
  }

}
