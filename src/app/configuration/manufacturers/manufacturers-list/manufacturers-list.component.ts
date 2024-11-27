import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ManufacturersService  } from '../manufacturers.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

export interface IManufacturers {
  id: number,
  name: string,
  description: string,
  isActive: boolean
}


@Component({
  selector: 'app-manufacturers-list',
  templateUrl: './manufacturers-list.component.html',
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
export class ManufacturersListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IManufacturers[]
  };
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Descripción', isBoolean:false},
    { name: 'Active', isBoolean:true}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'Description', isBoolean:false},
    { name: 'isActive', isBoolean:true}
  ];
  fg: FormGroup;
  manufacturersSrv:any;

  constructor(

  ){
    super();
    this.fg = this.fb.group({
      name: [''],
      description: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabManufacturers' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.manufacturersSrv = this.baseSrv as ManufacturersService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.manufacturersSrv.getAll().subscribe((All:any) => {
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
    localStorage.setItem('dataModifiedInNewTabManufacturers', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.manufacturersSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/manufacturers/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.manufacturersSrv._idToEdit = row.id;
    window.open(`/manufacturers/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.manufacturersSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/manufacturers/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.manufacturersSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/manufacturers/edit/${row}`)
  }

  override searchData(event: IManufacturers) {
    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.isActive) {
      payload = payload + `&isActive=${event.description}`;
    }
    this.loading = true;
    this.manufacturersSrv.getByFields(payload).subscribe({
      next: (res:any) => {
        this.loading = false;
        if (res.data.length === 0) {
          openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        } else {
          this.dataSource = { data: res.data };
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
