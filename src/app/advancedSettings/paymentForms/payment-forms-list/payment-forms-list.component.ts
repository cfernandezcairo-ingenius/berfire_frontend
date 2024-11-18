import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PaymentFormsService } from '../payment-forms.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IPaymentForms {
  id: number,
  name: string,
  days: number,
  home: boolean,
}


@Component({
  selector: 'app-payment-forms-list',
  templateUrl: './payment-forms-list.component.html',
  styleUrl: './payment-forms-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class PaymenFormsListComponent implements OnInit {

  dataSource = {
    data: [] as IPaymentForms[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels = ['','Nombre', 'Dias', 'Domiciliado'];
  displayedLabelsEs = ['','Nombre', 'Dias', 'Domiciliado'];
  displayedLabelsEn = ['','Name', 'Days', 'Domiciled'];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly paymentFormsSrv: PaymentFormsService,
    private fb: FormBuilder
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
      days: [''],
      home: [''],
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTab' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.paymentFormsSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTab', 'false');
    //this.payload = JSON.parse(localStorage.getItem('payloadNewTab')!);
    debugger;
    //Aqui tengo que recargar los datos desde el backend
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/payment-forms/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/payment-forms/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/payment-forms/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/payment-forms/edit/${row}`)
  }

  searchData(event: IPaymentForms) {
    debugger;
  }

  cleanSearchData() {
    this.fg.reset();
  }

}
