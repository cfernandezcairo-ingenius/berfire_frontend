import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { StatementOrderService } from '../statement-order.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { FormGroup } from '@angular/forms';

export interface IIStatementOrder {
  id: number,
  name: string,
  description: string,
  finalized: boolean,
}


@Component({
  selector: 'app-statement-order-list',
  templateUrl: './statement-order-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class StatementOrderListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IIStatementOrder[]
  };
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name: 'Descripción',isBoolean:false},
    { name: 'Finalizada', isBoolean:true}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Description',isBoolean:false},
    { name: 'Finalized', isBoolean:true}
  ];
  fg: FormGroup;

  StatementOrderSrv:any

  constructor(){
    super();
    this.fg = this.fb.group({
      name:[''],
      description: [''],
      finalized: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabStatementOrder' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.StatementOrderSrv = this.baseSrv as StatementOrderService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.StatementOrderSrv.getAll().subscribe((All:any) => {
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
    localStorage.setItem('dataModifiedInNewTabStatementOrder', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.StatementOrderSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/statement-order/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.StatementOrderSrv._idToEdit = row.id;
    window.open(`/statement-order/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.StatementOrderSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/statement-order/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.StatementOrderSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/statement-order/edit/${row}`)
  }

  overridesearchData(event: IIStatementOrder) {

    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.finalized) {
      payload = payload + `&finalized=${event.finalized}`;
    }
    this.loading = true;
    this.StatementOrderSrv.getByFields(payload).subscribe((res:any)=> {
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
