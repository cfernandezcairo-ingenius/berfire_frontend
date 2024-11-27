import { Component } from '@angular/core';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { UnsubscribeReasonsService } from '../unsubscribe-reasons.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IUnsubscribeReasons {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-unsubscribe-reasons-list',
  templateUrl: './unsubscribe-reasons-list.component.html',
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
export class UnsubscribeReasonsListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IUnsubscribeReasons[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Descripción', isBoolean: false}
  ];
  override displayedLabelsEs = this.displayedLabels
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Name',isBoolean: false},
    { name: 'Description', isBoolean: false}
  ];
  fg: FormGroup;
  unsubscribeReasonsSrv:any;

  constructor(){
    super();
    this.fg = this.fb.group({
      name: [''],
      description: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabUnsubscribeReasons' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.unsubscribeReasonsSrv = this.baseSrv as UnsubscribeReasonsService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.unsubscribeReasonsSrv.getAll().subscribe((All:any) => {
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
    localStorage.setItem('dataModifiedInNewTabUnsubscribeReasons', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.unsubscribeReasonsSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/unsubscribe-reasons/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.unsubscribeReasonsSrv._idToEdit = row.id;
    window.open(`/unsubscribe-reasons/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.unsubscribeReasonsSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/unsubscribe-reasons/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.unsubscribeReasonsSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/unsubscribe-reasons/edit/${row}`)
  }

  override searchData(event: IUnsubscribeReasons) {
    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    this.loading = true;
    this.unsubscribeReasonsSrv.getByFields(payload).subscribe((res:any)=> {
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
