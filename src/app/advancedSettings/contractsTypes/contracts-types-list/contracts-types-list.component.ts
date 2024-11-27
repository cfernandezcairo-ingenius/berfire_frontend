import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ContractsTypesService } from '../contracts-types.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IContractsTypes {
  id: number,
  name: string,
  duration: number,
  isWarning: boolean
}

@Component({
  selector: 'app-contracts-types-list',
  templateUrl: './contracts-types-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
,
providers: [TranslateService]
})
export class ContractsTypesListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IContractsTypes[]
  };
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
    { name:'', isBoolean: false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Duración', isBoolean:false},
    { name: 'Es aviso', isBoolean: true}
  ];
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'', isBoolean: false},
    { name: 'Name',isBoolean: false},
    { name: 'Duration', isBoolean:false},
    { name: 'isWarning', isBoolean: true}
  ];
  fg: FormGroup;
  contractsTypesSrv:any;

  constructor(){
    super();
    this.fg = this.fb.group({
      name:[''],
      description: [],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabContractsTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.contractsTypesSrv = this.baseSrv as ContractsTypesService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.contractsTypesSrv.getAll().subscribe((All:any) => {
      if (All.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        this.addItem();
      } else {
        this.dataSource = { data: All.data };;
        this.loading = false;
        this.todoListo = true;
      }
    });
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabContractsTypes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.contractsTypesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/contracts-types/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.contractsTypesSrv._idToEdit = row.id;
    window.open(`/contracts-types/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.contractsTypesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/contracts-types/delete/${strRow}`)
  }
  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.contractsTypesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/contracts-types/edit/${row}`)
  }

  override searchData(event: IContractsTypes) {
    let payload = `?name=${event.name}`;
    if (event.duration) {
      payload = payload + `&duration=${event.duration}`;
    }
    if (event.isWarning) {
      payload = payload + `&isWarning=${event.isWarning}`;
    }
    this.loading = true;
    this.contractsTypesSrv.getByFields(payload).subscribe((res:any) => {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
    });
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
