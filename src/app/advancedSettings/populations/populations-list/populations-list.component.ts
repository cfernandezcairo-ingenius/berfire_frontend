import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PopulationsService } from '../populations.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IPopulations {
  id: number,
  name: string,
  country: string,
  province: string,
  active: boolean
}


@Component({
  selector: 'app-populations-list',
  templateUrl: './populations-list.component.html',
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
export class PopulationsListComponent implements OnInit {

  dataSource = {
    data: [] as IPopulations[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name:'Pais',isBoolean:false},
    { name: 'Provincia',isBoolean:false},
    { name: 'Activo', isBoolean:true}
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name:'Country',isBoolean:false},
    { name: 'Province',isBoolean:false},
    { name: 'Active', isBoolean:true}
  ];

  constructor(
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly populationsSrv:PopulationsService,
    private readonly matSnackBar: MatSnackBar
  ){
    this.translate.onLangChange.subscribe(lc=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPopulations' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.populationsSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabPopulations', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.populationsSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/populations/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.populationsSrv._idToEdit = row.id;
    window.open(`/populations/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.populationsSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/populations/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.populationsSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/populations/edit/${row}`)
  }

  searchData(event: IPopulations) {
    let payload = `?name=${event.name}`;
    if (event.country) {
      payload = payload + `&country=${event.country}`;
    }
    if (event.province) {
      payload = payload + `&province=${event.province}`;
    }
    if (event.active) {
      payload = payload + `&active=${event.active}`;
    }
    this.loading = true;
    this.populationsSrv.getByFields(payload).subscribe(res=> {
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
    // this.fg.reset();
    this.loadAll();
  }

}
