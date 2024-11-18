import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { BillStatusService } from '../bill-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IBillStatements {
  id: number,
  name: string,
  isPaid: boolean,
  isReturned: boolean,
  isPending: boolean,
  isSent: boolean,
  isUnPaid: boolean
}

@Component({
  selector: 'app-bill-status-list',
  templateUrl: './bill-status-list.component.html',
  styleUrl: './bill-status-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class BillStatusListComponent implements OnInit {

  dataSource = {
    data: [] as IBillStatements[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels = ['','Nombre', 'Es Pagado', 'Es Devuelto', 'Es Pendiente', 'Es Enviado', 'Es impagado'];
  displayedLabelsEs = ['','Nombre', 'Es Pagado', 'Es Devuelto', 'Es Pendiente', 'Es Enviado', 'Es impagado'];
  displayedLabelsEn = ['','Name', 'is Paid', 'is returned', 'is pending', 'is sent', 'is unpaid'];
  fg: FormGroup

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly billStatusSrv:BillStatusService,
    private readonly fb: FormBuilder,
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
    this.translate.onLangChange.subscribe(lc=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });
    this.fg = this.fb.group({
      name:[''],
      isPaid: [],
      isReturned: [''],
      isPending: [''],
      isSent: [''],
      isUnPaid: ['']
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabBillStatements' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.billStatusSrv.getAll().subscribe(All => {
      if (All.data.length === 0) {
        Swal.fire({
          title: this.translate.instant('confirm'),
          text: this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.',
          icon: 'info',
          showConfirmButton:true,
          showCancelButton: false,
          confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
          background: this.darkMode ? '#444' : '#fff',
          color: this.darkMode ? '#fff' : '#000',
        })
        this.addItem();
      } else {
        this.dataSource.data = All.data;
        this.loading = false;
        this.todoListo = true;
      }
    })
  }

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabBillStatements', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/invoice-status/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/invoice-status/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/invoice-status/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/invoice-status/edit/${row}`)
  }

  searchData(event: IBillStatements) {
    debugger;
  }

  cleanSearchData() {
    this.fg.reset();
  }

}
