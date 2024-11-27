import { Component } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ContractsTypesService } from '../contracts-types.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

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

  override dataSource = {
    data: [] as IContractsTypes[]
  };
  payload: any;

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
  override newRoute: string = '/clients-types/edit';

  constructor(
    private readonly contractsTypesSrv: ContractsTypesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb:FormBuilder
  ){
    super(contractsTypesSrv, translate, matSnackBar,navigationSrv);
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
    this.loading = true;
    this.loadAll();
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabContractsTypes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }

  searchData(event: IContractsTypes) {
    let payload = `?name=${event.name}`;
    if (event.duration) {
      payload = payload + `&duration=${event.duration}`;
    }
    if (event.isWarning) {
      payload = payload + `&isWarning=${event.isWarning}`;
    }
    this.loading = true;
    super.searchDataBase(payload);
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg!.reset();
    this.loadAll();
  }

}
