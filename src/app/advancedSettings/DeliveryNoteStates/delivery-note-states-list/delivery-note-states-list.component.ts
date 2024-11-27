import { Component } from '@angular/core';
import { TranslateService, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { DeliveryNoteStatesService } from '../delivery-note-states.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IDeliveryNoteStates {
  id: number,
  name: string,
  confirmDeliveryNote: boolean
}

@Component({
  selector: 'app-delivery-note-states-list',
  templateUrl: './delivery-note-states-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService, TranslateStore]
})
export class DeliveryNoteStatesListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IDeliveryNoteStates[]
  };
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Confirma',isBoolean:true}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'Confirm',isBoolean:true}
  ];
  fg: FormGroup;
  deliveryNoteStatesSrv:any;

  constructor(

  ){
    super();
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabDeliveryNoteStates' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.fg = this.fb.group({
      name:[''],
      confirmDeliveryNote: [],
    });
  }

  override ngOnInit(): void {
    this.deliveryNoteStatesSrv = this.baseSrv as DeliveryNoteStatesService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.deliveryNoteStatesSrv.getAll().subscribe((All:any) => {
      if (All.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        this.addItem();
      } else {
        this.dataSource = { data: All.data };;
        this.loading = false;
        this.todoListo = true;
      }
    });
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabDeliveryNoteStates', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.deliveryNoteStatesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/delivery-note-states/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.deliveryNoteStatesSrv._idToEdit = row.id;
    window.open(`/delivery-note-states/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.deliveryNoteStatesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/delivery-note-states/delete/${strRow}`)
  }
  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.deliveryNoteStatesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/delivery-note-states/edit/${row}`)
  }

  override searchData(event: IDeliveryNoteStates) {
    let payload = `?name=${event.name}`;
    if (event.confirmDeliveryNote) {
      payload = payload + `&confirmDeliveryNote=${event.confirmDeliveryNote}`;
    }
    this.loading = true;
    this.deliveryNoteStatesSrv.getByFields(payload).subscribe((res:any)=> {
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
