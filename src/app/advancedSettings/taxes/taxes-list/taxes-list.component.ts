import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { TaxesService } from '../taxes.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ITaxes {
  id: number,
  title: string,
  value: string,
  equivalentSurcharge: string,
  isIGIC: boolean
}


@Component({
  selector: 'app-taxes-list',
  templateUrl: './taxes-list.component.html',
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
export class TaxesListComponent implements OnInit {

  dataSource = {
    data: [] as ITaxes[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean: false},
    { name: 'Titulo',isBoolean:false},
    { name: 'Valor',isBoolean:false},
    { name: 'Recargo',isBoolean:false},
    { name: 'es IGIC', isBoolean:true}
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean: false},
    { name: 'Title',isBoolean:false},
    { name: 'Value',isBoolean:false},
    { name: 'Surcharge',isBoolean:false},
    { name: 'isIGIC', isBoolean:true}
  ];
  fg: FormGroup;

  constructor(
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly taxesSrv:TaxesService,
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
      title: [''],
      value: [''],
      equivalentSurcharge: [''],
      isIGIC: ['']
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTaxes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.taxesSrv.getAll().subscribe(All => {
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

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabTaxes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.taxesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/taxes/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.taxesSrv._idToEdit = row.id;
    window.open(`/taxes/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.taxesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/taxes/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.taxesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/taxes/edit/${row}`)
  }

  searchData(event: ITaxes) {

    let payload = `?title=${event.title}`;
    if (event.value) {
      payload = payload + `&value=${event.value}`;
    }
    if (event.equivalentSurcharge) {
      payload = payload + `&equivalentSurcharge=${event.equivalentSurcharge}`;
    }
    if (event.isIGIC) {
      payload = payload + `&isIGIC=${event.isIGIC}`;
    }
    this.loading = true;
    this.taxesSrv.getByFields(payload).subscribe(res=> {
      this.loading =false;
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
