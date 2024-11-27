import { Component } from '@angular/core';
import { TranslateService , TranslateModule, TranslateStore } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ClientsTypesService } from '../clients-types.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IClientsTypes {
  id: number,
  name: string,
  description: string
}

@Component({
  selector: 'app-clients-types-list',
  templateUrl: './clients-types-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
,
providers: [TranslateService, TranslateStore]
})
export class ClientsTypesListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IClientsTypes[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean: false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Descripción', isBoolean:false}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean: false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Descripción', isBoolean:false}
  ];
  fg: FormGroup;

  clientsTypesSrv: any;

  constructor(

  ){
    super();
    this.fg = this.fb.group({
      name:[''],
      description: [],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabClientsTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.clientsTypesSrv = this.baseSrv as ClientsTypesService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.clientsTypesSrv.getAll().subscribe((All:any) => {
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
    localStorage.setItem('dataModifiedInNewTabClientsTypes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.clientsTypesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/clients-types/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.clientsTypesSrv._idToEdit = row.id;
    window.open(`/clients-types/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.clientsTypesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/clients-types/delete/${strRow}`)
  }
  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.clientsTypesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/clients-types/edit/${row}`)
  }

  override searchData(event: IClientsTypes) {

    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    this.loading = true;
    this.clientsTypesSrv.getByFields(payload).subscribe((res:any)=> {
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
