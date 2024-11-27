import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PaymentFormsService } from '../payment-forms.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IPaymentForms {
  id: number,
  name: string,
  days: number,
  home: boolean,
}


@Component({
  selector: 'app-payment-forms-list',
  templateUrl: './payment-forms-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers:[TranslateService]
})
export class PaymenFormsListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IPaymentForms[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Dias',isBoolean:false},
    { name: 'Domiciliado', isBoolean:true}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'Days',isBoolean:false},
    { name: 'Domiciled', isBoolean:true}
  ];
  fg: FormGroup;
  paymentFormsSrv: any;

  constructor() {
    super();
    this.fg = this.fb.group({
      name:[''],
      days: [''],
      home: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPaymentForms' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.paymentFormsSrv = this.baseSrv as PaymentFormsService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.paymentFormsSrv.getAll().subscribe((All:any) => {
      if (All.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        this.addItem();
      } else {
        this.dataSource = { data: All.data };;
        this.loading = false;
        this.todoListo = true;
      }
    })
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabPaymentForms', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.paymentFormsSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/payment-forms/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.paymentFormsSrv._idToEdit = row.id;
    window.open(`/payment-forms/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.paymentFormsSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/payment-forms/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.paymentFormsSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/payment-forms/edit/${row}`)
  }

  override searchData(event: IPaymentForms) {
    let payload = `?name=${event.name}`;
    if (event.days) {
      payload = payload + `&days=${event.days}`;
    }
    if (event.home) {
      payload = payload + `&home=${event.home}`;
    }
    this.loading = true;
    this.paymentFormsSrv.getByFields(payload).subscribe((res:any)=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
    });
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
