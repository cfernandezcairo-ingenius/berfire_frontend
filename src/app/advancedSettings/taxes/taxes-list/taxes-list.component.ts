import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { TaxesService } from '../taxes.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';

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
  styleUrl: './taxes-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
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
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly taxesSrv:TaxesService,
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
    })
  }

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabTaxes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/taxes/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/taxes/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/taxes/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/taxes/edit/${row}`)
  }

  searchData(event: ITaxes) {
    debugger;
  }

  cleanSearchData() {
    this.fg.reset();
  }

}
