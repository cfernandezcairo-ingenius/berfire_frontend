import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateService , TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { ClientsTypesService } from '../clients-types.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';


export interface IClientsTypes {
  id: number,
  name: string,
  description: boolean
}

@Component({
  selector: 'app-clients-types-list',
  templateUrl: './clients-types-list.component.html',
  styleUrl: './clients-types-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class ClientsTypesListComponent implements OnInit {

  dataSource = {
    data: [] as IClientsTypes[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean: false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Descripción', isBoolean:false}
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean: false},
    { name: 'Nombre',isBoolean: false},
    { name: 'Descripción', isBoolean:false}
  ];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly clientsTypesSrv: ClientsTypesService,
    private readonly fb: FormBuilder,
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
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
      if (event.key === 'dataModifiedInNewTabClientsTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.clientsTypesSrv.getAll().subscribe(All => {
      if (All.data.length === 0) {
        Swal.fire({
          title: this.translate.instant('confirm'),
          text: this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.',
          icon: 'info',
          showConfirmButton:true,
          showCancelButton: false,
          confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
          background: this.darkMode ? '#444' : '#fff',
          color: this.darkMode ? '#fff' : '#000',
        })
        this.addItem();
      } else {
        this.dataSource.data = All.data;
        this.loading = false;
        this.todoListo = true;
      }
    });
  }

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabClientsTypes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/clients-types/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/clients-types/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/clients-types/delete/${strRow}`)
  }
  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/clients-types/edit/${row}`)
  }

  searchData(event: IClientsTypes) {
    debugger;
  }

  cleanSearchData() {
    this.fg.reset();
  }

}
