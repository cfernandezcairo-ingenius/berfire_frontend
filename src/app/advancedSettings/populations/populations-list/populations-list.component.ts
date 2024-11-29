import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PopulationsService } from '../populations.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsPopulationsEn, getLabelsPopulationsEs } from './labels';

export interface IPopulations {
  id: number,
  name: string,
  country: string,
  province: string,
  active: boolean
}


@Component({
  selector: 'app-populations-list',
  templateUrl: './populations-list.component.html',
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
export class PopulationsListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IPopulations[]
  };

  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsPopulationsEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsPopulationsEn();

  fg: FormGroup;
  override newRoute: string = '/populations/edit';
  override routefromNewTab:string = 'dataModifiedInNewTabPopulations';

  constructor(
    private readonly populationsSrv: PopulationsService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(populationsSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      country: [''],
      province: [''],
      active: [''],
    });
  }

  searchData(event: IPopulations) {
    let payload = `?name=${event.name}`;
    if (event.country) {
      payload = payload + `&country=${event.country}`;
    }
    if (event.province) {
      payload = payload + `&province=${event.province}`;
    }
    if (event.active) {
      payload = payload + `&active=${event.active}`;
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
