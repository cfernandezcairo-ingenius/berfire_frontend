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

  override displayedLabels: IDisplayedLabels[] = [
    {
      name:'', isBoolean: false
    },
    {
      name: 'Nombre', isBoolean: false
     },
     {
      name:'Swift',isBoolean: false
    },
    {
      name: 'Iban', isBoolean: false
    }
  ];
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn: IDisplayedLabels[] = [
    {
      name:'', isBoolean: false
    },
    {
      name: 'Name', isBoolean: false
     },
     {
      name:'Swift',isBoolean: false
    },
    {
      name: 'Iban', isBoolean: false
    }
  ];
  fg: FormGroup;
  override newRoute: string = '/banks/edit';

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
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabBanks' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }
   override ngOnInit(): void {
    this.loading = true;
    this.loadAll();
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabBanks', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
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
