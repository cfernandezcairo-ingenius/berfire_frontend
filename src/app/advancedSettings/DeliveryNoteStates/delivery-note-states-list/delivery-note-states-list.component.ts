import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import Swal from 'sweetalert2';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { DeliveryNoteStatesService } from '../delivery-note-states.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface IDeliveryNoteStates {
  id: number,
  name: string,
  confirmDeliveryNote: boolean
}

@Component({
  selector: 'app-delivery-note-states-list',
  templateUrl: './delivery-note-states-list.component.html',
  styleUrl: './delivery-note-states-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class DeliveryNoteStatesListComponent implements OnInit {

  dataSource = {
    data: [] as IDeliveryNoteStates[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels = ['','Nombre', 'Confirma el albarán'];
  displayedLabelsEs = ['','Nombre', 'Confirma el albarán'];
  displayedLabelsEn = ['','Name', 'Confirm delivery note'];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly deliveryNoteStatesSrv: DeliveryNoteStatesService,
    private readonly fb: FormBuilder,
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabDeliveryNoteStates' && event.newValue === 'true') {
        this.handleDataChange();
      }
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
      confirmDeliveryNote: [],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.deliveryNoteStatesSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabDeliveryNoteStates', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/delivery-note-states/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/delivery-note-states/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/delivery-note-states/delete/${strRow}`)
  }
  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/delivery-note-states/edit/${row}`)
  }

  searchData(event: IDeliveryNoteStates) {
    debugger;
  }

  cleanSearchData() {
    this.fg.reset();
  }

}
