import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { WorkStatusService } from '../work-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsWorkStatusEn, getLabelsWorkStatusEs } from './labels';

export interface IWorkStatus {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-work-status-list',
  templateUrl: './work-status-list.component.html',
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
export class WorkStatusListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IWorkStatus[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsWorkStatusEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsWorkStatusEn();

  fg: FormGroup;

  override newRoute: string = '/work-status/edit';
  override newRouteToDelete:string = 'work-status/delete';
  override routefromNewTab:string = 'dataModifiedInNewTabWorkStatus';

  constructor(
    private readonly workStatusSrv: WorkStatusService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb:FormBuilder
  ){
    super(workStatusSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  searchData(event: IWorkStatus) {
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
