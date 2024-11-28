import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { PrIncidentsService } from '../prIncidents.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

export interface IprIncidents {
  id: number,
  code: string,
  order: number,
  periodicity: string,
  description: string,
  report: string
}


@Component({
  selector: 'app-prIncidents-list',
  templateUrl: './prIncidents-list.component.html',
  styles:'',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class PrIncidentsListComponent extends BaseListComponent implements OnInit {

  override dataSource = {
    data: [] as IprIncidents[]
  };
  payload: any;

  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Código',isBoolean:false},
    { name:'Orden',isBoolean:false},
    { name: 'Periodicidad',isBoolean:false},
    { name: 'Descripción', isBoolean:false}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Code',isBoolean:false},
    { name: 'Order',isBoolean:false},
    { name: 'Periodicity',isBoolean:false},
    { name: 'Description', isBoolean:false}
  ];

  fg: FormGroup;

  override newRoute: string = '/prIncidents/edit';

  constructor(
    private readonly prIncidentsSrv: PrIncidentsService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(prIncidentsSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      teamName:[''],
      teamTitle: [''],
      description: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPrIncidents' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {

    this.loading = true;
    this.loadAll();
  }

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabPrIncidents', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }
  searchData(event: IprIncidents) {

    let payload = `?name=${event.code}`;
    if (event.order) {
      payload = payload + `&order=${event.order}`;
    }
    if (event.periodicity) {
      payload = payload + `&periodicity=${event.periodicity}`;
    }
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.report) {
      payload = payload + `&report=${event.report}`;
    }
    this.loading = true;
    super.searchDataBase(payload);
    this.todoListo = true;
  }

  override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
