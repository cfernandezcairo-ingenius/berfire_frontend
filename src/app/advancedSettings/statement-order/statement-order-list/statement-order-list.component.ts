import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { StatementOrderService } from '../statement-order.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsStatementOrderEn, getLabelsStatementOrderEs } from './labels';

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

  override dataSource = {
    data: [] as IIStatementOrder[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsStatementOrderEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsStatementOrderEn();
  fg: FormGroup;

  override newRoute: string = '/statement-order/edit';
  override newRouteToDelete:string = 'statement-order/delete';
  override routefromNewTab:string = 'dataModifiedInNewTabStatementOrder';

  constructor(
    private readonly StatementOrderSrv: StatementOrderService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(StatementOrderSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      description: [''],
      finalized: [''],
    });
  }

  searchData(event: IIStatementOrder) {

    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.finalized) {
      payload = payload + `&finalized=${event.finalized}`;
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
