import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ContractsTypesService } from '../contracts-types.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class ContractsTypesListComponent implements OnInit {

  dataSource = {
    data: [] as IContractsTypes[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels: IDisplayedLabels[] = [
    { name:'', isBoolean: false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Duración', isBoolean:false},
    { name: 'Es aviso', isBoolean: true}
  ];
  displayedLabelsEs = this.displayedLabels
  displayedLabelsEn: IDisplayedLabels[] = [
    { name:'', isBoolean: false},
    { name: 'Name',isBoolean: false},
    { name: 'Duration', isBoolean:false},
    { name: 'isWarning', isBoolean: true}
  ];
  fg: FormGroup;

  constructor(
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly contractsTypesSrv: ContractsTypesService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar
  ){
    this.translate.onLangChange.subscribe(lc=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });
    this.fg = this.fb.group({
      name:[''],
      description: [],
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabContractsTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.contractsTypesSrv.getAll().subscribe(All => {
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

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabContractsTypes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.contractsTypesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/contracts-types/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.contractsTypesSrv._idToEdit = row.id;
    window.open(`/contracts-types/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.contractsTypesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/contracts-types/delete/${strRow}`)
  }
  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.contractsTypesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/contracts-types/edit/${row}`)
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
    this.contractsTypesSrv.getByFields(payload).subscribe(res=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
    });
    this.todoListo = true;
  }

 cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
