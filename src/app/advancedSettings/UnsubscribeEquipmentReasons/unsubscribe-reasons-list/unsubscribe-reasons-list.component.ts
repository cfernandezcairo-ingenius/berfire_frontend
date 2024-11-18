import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { UnsubscribeReasonsService } from '../unsubscribe-reasons.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IUnsubscribeReasons {
  id: number,
  name: string,
  description: string,
}


@Component({
  selector: 'app-unsubscribe-reasons-list',
  templateUrl: './unsubscribe-reasons-list.component.html',
  styleUrl: './unsubscribe-reasons-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class UnsubscribeReasonsListComponent implements OnInit {

  dataSource = {
    data: [] as IUnsubscribeReasons[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels = ['','Nombre', 'Descripción'];
  displayedLabelsEs = ['','Nombre', 'Descripción'];
  displayedLabelsEn = ['','Name', 'Description'];
  fg: FormGroup;

  constructor(
    private darkModeService: StyleManager,
    private navigationSrv: NavigationService,
    private translate: TranslateService,
    private unsubscribeReasonsSrv:UnsubscribeReasonsService,
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
      if (event.key === 'dataModifiedInNewTabUnsubscribeReasons' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.unsubscribeReasonsSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabUnsubscribeReasons', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/unsubscribe-reasons/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/unsubscribe-reasons/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/unsubscribe-reasons/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/unsubscribe-reasons/edit/${row}`)
  }

  searchData(event: IUnsubscribeReasons) {
    debugger;
  }

  cleanSearchData() {
    this.fg.reset();
  }

}
