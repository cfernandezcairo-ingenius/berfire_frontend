import { Component } from '@angular/core';
import { TranslateService , TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ClientsTypesService } from '../clients-types.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

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
providers: [TranslateService]
})
export class ClientsTypesListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IClientsTypes[]
  };

  payload: any;

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
  override newRoute: string = '/clients-types/edit';

  constructor(
    private readonly clientsTypesSrv: ClientsTypesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(clientsTypesSrv, translate, matSnackBar,navigationSrv);
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

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabClientsTypes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }

  searchData(event: IClientsTypes) {

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
