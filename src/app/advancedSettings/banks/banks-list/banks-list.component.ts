import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { BanksService } from '../banks.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IBanks {
  id: number,
  name: string,
  swift: string,
  Iban: number
}


@Component({
  selector: 'app-banks-list',
  templateUrl: './banks-list.component.html',
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
export class BanksListComponent extends BaseListComponent {

  banksSrv:any;

  dataSource = {
    data: [] as IBanks[]
  };
  payload: any;
  loading = false;
  todoListo = false;
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

  constructor(

  ){
    super();
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
    this.banksSrv = this.baseSrv as BanksService;
    this.loading = true;
    this.loadAll();
  }

  overrideloadAll() {
    this.loading = true;
    this.banksSrv.getAll().subscribe((All:any) => {
      if (All.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        this.addItem();
      } else {
        this.dataSource = { data: All.data };;
        this.loading = false;
        this.todoListo = true;
      }
    })
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabBanks', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.banksSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/banks/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.banksSrv._idToEdit = row.id;
    window.open(`/banks/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.banksSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/banks/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/banks/edit/${row}`)
  }

  override searchData(event: IBanks) {

    let payload = `?name=${event.name}`;
    if (event.swift) {
      payload = payload + `&swift=${event.swift}`;
    }
    if (event.Iban) {
      payload = payload + `&Iban=${event.Iban}`;
    }
    this.loading = true;
    this.banksSrv.getByFields(payload).subscribe((res:any)=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
      this.todoListo = true;
    });
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
