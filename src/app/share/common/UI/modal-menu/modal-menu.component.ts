import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-menu',
  standalone: true,
  imports: [ MatButtonModule, MatMenuModule, MatIcon, CommonModule, TranslateModule],
  templateUrl: './modal-menu.component.html',
  styles: ''
})
export class ModalMenuComponent {

  @Input() row: any
  @Output() menuEdit = new EventEmitter();
  @Output() menuEditNueva = new EventEmitter();
  @Output() menuDelete = new EventEmitter();
  darkMode = false;

  constructor() {
  }


  edit(row: any) {
    this.menuEdit.emit(row);
  }

  editNewPagina(row:any) {
    this.menuEditNueva.emit(row);
  }
  delete(id: any) {
    this.menuDelete.emit(id);
  }

}
