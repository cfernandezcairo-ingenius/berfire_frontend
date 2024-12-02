import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { StatesPartiesReviewService } from '../states-parties-review.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsStatesPartiesReviewEn, getLabelsStatesPartiesReviewEs } from './labels';

export interface IPrStatus {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-states-parties-review-list',
  templateUrl: './states-parties-review-list.component.html',
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
export class StatesPartiesReviewListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IPrStatus[]
  };

  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsStatesPartiesReviewEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsStatesPartiesReviewEn();
  fg: FormGroup;

  override newRoute: string = '/states-parties-review/edit';
  override newRouteToDelete:string = 'states-parties-review/delete';
  override routefromNewTab:string = 'dataModifiedInNewTabStatesPartiesReview';

  constructor(
    private readonly statesPartiesReviewSrv: StatesPartiesReviewService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(statesPartiesReviewSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      description: [''],
    });
  }

  searchData(event: IPrStatus) {

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
