import { Component } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { RequestStatusService } from '../request-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IRequestStatus {
  id: number,
  name: string,
  code: string,
}


@Component({
  selector: 'app-request-status-list',
  templateUrl: './request-status-list.component.html',
  styles: '',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService, TranslateStore]
})
export class RequestStatusListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IRequestStatus[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name: 'Código', isBoolean:false}
  ];
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Code', isBoolean:false}
  ];
  fg: FormGroup;
  requestStatusSrv: any;

  constructor(){
    super();
    this.fg = this.fb.group({
      name:[''],
      code: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabRequestStatus' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.requestStatusSrv = this.baseSrv as RequestStatusService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.requestStatusSrv.getAll().subscribe((All:any) => {
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
    debugger;
    localStorage.setItem('dataModifiedInNewTabRequestStatus', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new');
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.requestStatusSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/request-status/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.requestStatusSrv._idToEdit = row.id;
    window.open(`/request-status/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.requestStatusSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/request-status/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.requestStatusSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/request-status/edit/${row}`)
  }

  override searchData(event: IRequestStatus) {
    let payload = `?name=${event.name}`;
    if (event.code) {
      payload = payload + `&code=${event.code}`;
    }
    this.loading = true;
    this.requestStatusSrv.getByFields(payload).subscribe((res:any)=> {
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
