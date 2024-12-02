import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { BillStatusService } from '../bill-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBillStatements, IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsBillStatusEn, getLabelsBillStatusEs } from './labels';

@Component({
  selector: 'app-bill-status-list',
  templateUrl: './bill-status-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
,
providers: [TranslateService]
})
export class BillStatusListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IBillStatements[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsBillStatusEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsBillStatusEn();

  fg: FormGroup;

  override newRoute: string = '/invoice-status/edit';
  override newRouteToDelete:string = 'invoice-status/delete';
  override routefromNewTab:string = 'dataModifiedInNewTabBillStatements';

  constructor(
    private readonly billStatusSrv: BillStatusService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(billStatusSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      isPaid: [],
      isReturned: [''],
      isPending: [''],
      isSent: [''],
      isUnPaid: ['']
    });
  }

  searchData(event: IBillStatements) {

    let payload = `?name=${event.name}`;
    if (event.isPaid) {
      payload = payload + `&isPaid=${event.isPaid}`;
    }
    if (event.isReturned) {
      payload = payload + `&isReturned=${event.isReturned}`;
    }
    if (event.isPending) {
      payload = payload + `&isPending=${event.isPending}`;
    }
    if (event.isSent) {
      payload = payload + `&isSent=${event.isSent}`;
    }
    if (event.isUnPaid) {
      payload = payload + `&isUnPaid=${event.isUnPaid}`;
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
