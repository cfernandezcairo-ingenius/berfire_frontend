import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { FacturasService } from '../facturas.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-facturas-list',
  templateUrl: './facturas-list.component.html',
  styleUrl: './facturas-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule
]
})
export class FacturasListComponent implements OnInit {

  dataSource: any;
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;

  constructor(
    private darkModeService: StyleManager,
    private navigationSrv: NavigationService,
    private translate: TranslateService,
    private facturasSrv: FacturasService
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTab' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.facturasSrv.getAll().subscribe(facturasAll => {
      this.dataSource = facturasAll;
      this.loading = false;
      this.todoListo = true;
    });
  }

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTab', 'false');
    //this.payload = JSON.parse(localStorage.getItem('payloadNewTab')!);
    debugger;
    //Aqui tengo que recargar los datos desde el backend
  }


  editar(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/invoice/edit/${strRow}`)
  }

  editarNueva(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/invoice/edit/new/${strRow}`, '_blank')
  }


  eliminar(id: number) {
    Swal.fire({
      title: this.translate.instant('confirm'),
      text: this.translate.currentLang === 'es' ? 'Desea continuar?' : 'Do you want to continue',
      icon: 'question',
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
      cancelButtonText: this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel',
      background: this.darkMode ? '#444' : '#fff',
      color: this.darkMode ? '#fff' : '#000',
    })
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/invoice/edit/${row}`)
  }

  //localStorage.getItem('payloadNewTab')
}
