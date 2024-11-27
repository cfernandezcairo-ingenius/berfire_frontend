import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PaymentFormsService } from '../payment-forms.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

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

  override dataSource = {
    data: [] as IPaymentForms[]
  };

  payload: any;

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
  override newRoute: string = '/payment-forms/edit';

  constructor(
    private readonly paymentFormsSrv: PaymentFormsService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ) {
    super(paymentFormsSrv, translate, matSnackBar,navigationSrv);
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
    this.loading = true;
    this.loadAll();
  }

  searchData(event: IPaymentForms) {
    let payload = `?name=${event.name}`;
    if (event.days) {
      payload = payload + `&days=${event.days}`;
    }
    if (event.home) {
      payload = payload + `&home=${event.home}`;
    }
    this.loading = true;
    super.searchDataBase(payload);
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg!.reset();
    this.loadAll();
  }

}
