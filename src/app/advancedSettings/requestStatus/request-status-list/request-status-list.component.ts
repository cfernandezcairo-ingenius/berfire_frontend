import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { RequestStatusService } from '../request-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

export interface IRequestStatus {
  id: number,
  name: string,
  code: string,
}


@Component({
  selector: 'app-request-status-list',
  templateUrl: './request-status-list.component.html',
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
export class RequestStatusListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IRequestStatus[]
  };

  payload: any;

  override displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name: 'Código', isBoolean:false}
  ];
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Code', isBoolean:false}
  ];

  fg: FormGroup;
  override newRoute: string = '/request-status/edit';
  override routefromNewTab:string = 'dataModifiedInNewTabRequestStatus';

  constructor(
    private readonly requestStatusSrv: RequestStatusService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb:FormBuilder
  ){
    super(requestStatusSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      code: [''],
    });
  }

  searchData(event: IRequestStatus) {
    let payload = `?name=${event.name}`;
    if (event.code) {
      payload = payload + `&code=${event.code}`;
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
