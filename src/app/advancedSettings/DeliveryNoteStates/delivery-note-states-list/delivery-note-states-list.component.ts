import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { DeliveryNoteStatesService } from '../delivery-note-states.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

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
providers: [TranslateService]
})
export class DeliveryNoteStatesListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IDeliveryNoteStates[]
  };
  payload: any;

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
  override newRoute: string = '/delivery-note-states/edit';
  override routefromNewTab:string = 'dataModifiedInNewTabDeliveryNoteStates';

  constructor(
    private readonly deliveryNoteStatesSrv: DeliveryNoteStatesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(deliveryNoteStatesSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      confirmDeliveryNote: [],
    });
  }

  searchData(event: IDeliveryNoteStates) {
    let payload = `?name=${event.name}`;
    if (event.confirmDeliveryNote) {
      payload = payload + `&confirmDeliveryNote=${event.confirmDeliveryNote}`;
    }
    this.loading = true;
    super.searchDataBase(payload);
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
