import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PrTypesService } from '../prTypes.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  styleUrl: './prTypes-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class PrTypesListComponent implements OnInit {

  dataSource = {
    data: [] as IprTypes[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;

  displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name:'Nombre Equipo',isBoolean:false},
    { name: 'Titulo Equipo',isBoolean:false},
    { name: 'description', isBoolean:false}
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Team Name',isBoolean:false},
    { name: 'Title Name',isBoolean:false},
    { name: 'Description', isBoolean:false}
  ];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly prTypesSrv: PrTypesService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });

    this.fg = this.fb.group({
      name:[''],
      teamName:[''],
      teamTitle: [''],
      description: [''],
    });
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
      if (event.key === 'dataModifiedInNewTabPrTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.prTypesSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabPrTypes', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.prTypesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/prTypes/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.prTypesSrv._idToEdit = row.id;
    window.open(`/prTypes/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.prTypesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/prTypes/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.prTypesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/prTypes/edit/${row}`)
  }

  searchData(event: IprTypes) {

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
    this.prTypesSrv.getByFields(payload).subscribe(res=> {
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
