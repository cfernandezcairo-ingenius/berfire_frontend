import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { UnsubscribeReasonsService } from '../unsubscribe-reasons.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsUnsubscribeReasonsEn, getLabelsUnsubscribeReasonsEs } from './labels';

export interface IUnsubscribeReasons {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-unsubscribe-reasons-list',
  templateUrl: './unsubscribe-reasons-list.component.html',
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
export class UnsubscribeReasonsListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IUnsubscribeReasons[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsUnsubscribeReasonsEs();
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsUnsubscribeReasonsEn();

  fg: FormGroup;

  override newRoute: string = '/unsubscribe-reasons/edit';
  override newRouteToDelete:string = 'unsubscribe-reasons/delete';
  override routefromNewTab:string = 'dataModifiedInNewTabUnsubscribeReasons';

  constructor(
    private readonly unsubscribeReasonsSrv: UnsubscribeReasonsService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(unsubscribeReasonsSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  searchData(event: IUnsubscribeReasons) {
    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
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
