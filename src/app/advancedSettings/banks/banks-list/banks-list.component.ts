import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { BanksService } from '../banks.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getLabelsBanksEn, getLabelsBanksEs } from './labels';

export interface IBanks {
  id: number,
  name: string,
  swift: string,
  Iban: number
}


@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
  styleUrl: './banks-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class BanksListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IBanks[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = getLabelsBanksEs();
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn: IDisplayedLabels[] = getLabelsBanksEn();
  fg: FormGroup;
  override newRoute: string = '/banks/edit';
  override newRouteToDelete:string = 'banks/delete';
  override routefromNewTab:string = 'dataModifiedInNewTabBanks';

  constructor(
    private readonly banksSrv: BanksService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(banksSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      swift: [''],
      Iban: [],
    });
  }

  searchData(event: IBanks) {

    let payload = `?name=${event.name}`;
    if (event.swift) {
      payload = payload + `&swift=${event.swift}`;
    }
    if (event.Iban) {
      payload = payload + `&Iban=${event.Iban}`;
    }
    this.loading = true;
    super.searchDataBase(payload);
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }
}
