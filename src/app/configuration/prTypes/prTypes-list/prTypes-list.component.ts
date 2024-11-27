import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { PrTypesService } from '../prTypes.service';

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

  dataSource = {
    data: [] as IprTypes[]
  };
  payload: any;
  loading = false;
  todoListo = false;

  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name:'Nombre Equipo',isBoolean:false},
    { name: 'Titulo Equipo',isBoolean:false},
    { name: 'description', isBoolean:false}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Team Name',isBoolean:false},
    { name: 'Title Name',isBoolean:false},
    { name: 'Description', isBoolean:false}
  ];
  fg: FormGroup;
  prTypesSrv: any;

  constructor(

  ){
    super();
    this.fg = this.fb.group({
      name:[''],
      teamName:[''],
      teamTitle: [''],
      description: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPrTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.prTypesSrv = this.baseSrv as PrTypesService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.prTypesSrv.getAll().subscribe({
      next: (All:any) => {
        if (All.data.length === 0) {
          openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
          this.addItem();
        } else {
          this.dataSource = { data: All.data };
          this.loading = false;
          this.todoListo = true;
        }
      }
    });
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabPrTypes', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.prTypesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/prTypes/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.prTypesSrv._idToEdit = row.id;
    window.open(`/prTypes/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.prTypesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/prTypes/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.prTypesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/prTypes/edit/${row}`)
  }

  override searchData(event: IprTypes) {

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
    this.prTypesSrv.getByFields(payload).subscribe({
      next:(res:any) => {
        this.loading = false;
        if (res.data.length === 0) {
          openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        } else {
          this.dataSource = { data: res.data };
        }
      }
    });
    this.todoListo = true;
  }

  override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
