import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';
import { StyleManager } from '../../../services/style-manager.service';

@Component({
  selector: 'app-modal-menu',
  standalone: true,
  imports: [ MatButtonModule, MatMenuModule, MatIcon, CommonModule, TranslateModule],
  templateUrl: './modal-menu.component.html',
  styleUrl: './modal-menu.component.scss'
})
export class ModalMenuComponent {

  @Input() row: any
  @Output() menuEdit = new EventEmitter();
  @Output() menuEditNueva = new EventEmitter();
  @Output() menuDelete = new EventEmitter();
  darkMode = false;

  constructor(private darkModeService: StyleManager) {
    this.darkModeService.darkMode$.subscribe((dark: boolean) => {
      this.darkMode = dark;
    });
  }


  editar(row: any) {
    this.menuEdit.emit(row);
  }

  editarNuevaPagina(row:any) {
    this.menuEditNueva.emit(row);
  }
  eliminar(id: any) {
    this.menuDelete.emit(id);
  }

}
