import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardActions, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { StyleManager } from '../../../services/style-manager.service';
import { TranslateModule } from '@ngx-translate/core';

export type strucNew = {
  clave: string,
  valor: string
}

@Component({
  selector: 'app-mat-table-mobile',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCardActions,FormsModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './mat-table-mobile.component.html',
  styleUrl: './mat-table-mobile.component.scss'
})


export class MatTableMobileComponent implements OnInit {

  @Input() title = '';
  @Input() subtitle = '';
  @Input() data: any;
  @Output() editarEvent = new EventEmitter();
  @Output() eliminarEvent = new EventEmitter();

  dataNew: strucNew[] = [];
  darkMode = false;

  constructor(private darkModeService: StyleManager) {
    this.darkModeService.darkMode$.subscribe((dark: boolean) => {
      this.darkMode = dark;
    });
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

  editar() {
    this.editarEvent.emit(this.data)
  }

  eliminar() {
    this.eliminarEvent.emit(this.data.id)
  }

}
