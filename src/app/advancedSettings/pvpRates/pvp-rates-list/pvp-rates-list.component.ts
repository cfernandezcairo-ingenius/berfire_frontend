import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PVPRatesService } from '../pvp-rates.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

export interface IPvpRates {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-pvp-rates-list',
  templateUrl: './pvp-rates-list.component.html',
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
export class PvPRatesListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IPvpRates[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Descripción',isBoolean:false}
  ];
  override displayedLabelsEs =this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'Description',isBoolean:false}
  ];

  fg: FormGroup;
  override newRoute: string = '/pvp-rates/edit';
  override routefromNewTab:string = 'dataModifiedInNewTabPvPRates';

  constructor(
    private readonly pVPRatesSrv: PVPRatesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb:FormBuilder
  ){
    super(pVPRatesSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      description: [''],
    });
  }

  searchData(event: IPvpRates) {
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
