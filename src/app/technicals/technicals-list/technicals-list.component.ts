import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../share/common/UI/table-list/table-list.component";
import { TechnicalsService  } from '../technicals.service';
import { SpinnerComponent } from "../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../navigation/shared/models/app-models';

export interface ITechnicals {
  id: number,
  name: string,
  firstSurname: string,
  secondSurName: string,
  user: number
}


@Component({
  selector: 'app-technicals-list',
  templateUrl: './technicals-list.component.html',
  styleUrl: './technicals-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class TechnicalsListComponent implements OnInit {

  dataSource = {
    data: [] as ITechnicals[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Primer Apellido', isBoolean:false},
    { name: 'Segundo Apellido', isBoolean:false},
    { name: 'Usuario', isBoolean:false}
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'first Surname', isBoolean:false},
    { name: 'second Surname', isBoolean:false},
    { name: 'User', isBoolean:false}
  ];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly technicalsSrv: TechnicalsService,
    private readonly fb: FormBuilder
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
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTechnicals' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.technicalsSrv.getAll().subscribe(All => {
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
        this.dataSource = { data: All.data };;
        this.loading = false;
        this.todoListo = true;
      }
    })
  }

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabTechnicals', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/technicals/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/technicals/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/technicals/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/technicals/edit/${row}`)
  }

  searchData(event: ITechnicals) {
    let payload = `?name=${event.name}`;
    if (event.firstSurname) {
      payload = payload + `&firstSurname=${event.firstSurname}`;
    }
    if (event.secondSurName) {
      payload = payload + `&secondSurName=${event.secondSurName}`;
    }
    if (event.user) {
      payload = payload + `&user=${event.user}`;
    }
    this.loading = true;
    this.technicalsSrv.getByFields(payload).subscribe(res=> {
      this.loading = false;
      if (res.data.length === 0) {
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