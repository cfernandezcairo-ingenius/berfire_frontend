import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { StatementOrderService } from '../statement-order.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IIStatementOrder {
  id: number,
  name: string,
  description: string,
  finalized: boolean,
}


@Component({
  selector: 'app-statement-order-list',
  templateUrl: './statement-order-list.component.html',
  styleUrl: './statement-order-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class StatementOrderListComponent implements OnInit {

  dataSource = {
    data: [] as IIStatementOrder[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name: 'Descripción',isBoolean:false},
    { name: 'Finalizada', isBoolean:true}
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name: 'Description',isBoolean:false},
    { name: 'Finalized', isBoolean:true}
  ];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly StatementOrderSrv: StatementOrderService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
    this.fg = this.fb.group({
      name:[''],
      description: [''],
      finalized: [''],
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
      if (event.key === 'dataModifiedInNewTabStatementOrder' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.StatementOrderSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabStatementOrder', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.StatementOrderSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/statement-order/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.StatementOrderSrv._idToEdit = row.id;
    window.open(`/statement-order/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.StatementOrderSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/statement-order/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.StatementOrderSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/statement-order/edit/${row}`)
  }

  searchData(event: IIStatementOrder) {

    let payload = `?name=${event.name}`;
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.finalized) {
      payload = payload + `&finalized=${event.finalized}`;
    }
    this.loading = true;
    this.StatementOrderSrv.getByFields(payload).subscribe(res=> {
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
