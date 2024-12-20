import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { PrTypesService } from '../prTypes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsPrTypesEn, getLabelsPrTypesEs } from './labels';
import { getfgPrTypes } from './getfg';

export interface IprTypes {
  id: number,
  name: string,
  teamName: string,
  teamTitle: string,
  description: string
}


@Component({
  selector: 'app-prTypes-list',
  templateUrl: './prTypes-list.component.html',
  styles:'',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class PrTypesListComponent extends BaseListComponent implements OnInit {

  override dataSource = {
    data: [] as IprTypes[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsPrTypesEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsPrTypesEn();

  fg: FormGroup;

  override newRoute: string = '/prTypes/edit';
  override newRouteToDelete:string = 'prTypes/delete';

  constructor(
    private readonly prTypesSrv: PrTypesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(prTypesSrv, translate, matSnackBar,navigationSrv);
    this.fg = getfgPrTypes(this.fb);
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPrTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {

    this.loading = true;
    this.loadAll();
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabPrTypes', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }

  searchData(event: IprTypes) {

    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.teamName) {
      payload = payload + `&teamName=${event.teamName}`;
    }
    if (event.teamTitle) {
      payload = payload + `&teamTitle=${event.teamTitle}`;
    }
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
