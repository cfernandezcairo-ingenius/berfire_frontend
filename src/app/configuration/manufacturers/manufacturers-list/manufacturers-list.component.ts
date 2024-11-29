import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ManufacturersService  } from '../manufacturers.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsManufacturersEn, getLabelsManufacturersEs } from './labels';

export interface IManufacturers {
  id: number,
  name: string,
  description: string,
  isActive: boolean
}


@Component({
  selector: 'app-manufacturers-list',
  templateUrl: './manufacturers-list.component.html',
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
export class ManufacturersListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IManufacturers[]
  };
  payload: any;
  override displayedLabels: IDisplayedLabels[] = getLabelsManufacturersEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsManufacturersEn();

  fg: FormGroup;

  override newRoute: string = '/manufacturers/edit';
  override routefromNewTab:string = 'dataModifiedInNewTabManufacturers';

  constructor(
    private readonly manufacturersSrv: ManufacturersService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(manufacturersSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  searchData(event: IManufacturers) {
    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.isActive) {
      payload = payload + `&isActive=${event.description}`;
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
