import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { StatesPartiesReviewService } from '../states-parties-review.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IPrStatus {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-states-parties-review-list',
  templateUrl: './states-parties-review-list.component.html',
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
export class StatesPartiesReviewListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IPrStatus[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name: 'Descripción',isBoolean:false},
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Description',isBoolean:false},
  ];
  fg: FormGroup;
  statesPartiesReviewSrv:any;

  constructor(){
    super();
    this.fg = this.fb.group({
      name:[''],
      description: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabStatesPartiesReview' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.statesPartiesReviewSrv = this.baseSrv as StatesPartiesReviewService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.statesPartiesReviewSrv.getAll().subscribe((All:any) => {
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
    localStorage.setItem('dataModifiedInNewTabStatesPartiesReview', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.statesPartiesReviewSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/states-parties-review/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.statesPartiesReviewSrv._idToEdit = row.id;
    window.open(`/states-parties-review/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.statesPartiesReviewSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/states-parties-review/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.statesPartiesReviewSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/states-parties-review/edit/${row}`)
  }

  override searchData(event: IPrStatus) {

    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    this.loading = true;
    this.statesPartiesReviewSrv.getByFields(payload).subscribe((res:any)=> {
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
