import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { PopulationsService } from '../populations.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

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
export class PopulationsListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as IPopulations[]
  };

  payload: any;

  override displayedLabels: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Nombre',isBoolean:false},
    { name:'Pais',isBoolean:false},
    { name: 'Provincia',isBoolean:false},
    { name: 'Activo', isBoolean:true}
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] = [
    { name:'',isBoolean:false},
    { name:'Name',isBoolean:false},
    { name:'Country',isBoolean:false},
    { name: 'Province',isBoolean:false},
    { name: 'Active', isBoolean:true}
  ];

  fg: FormGroup;
  override newRoute: string = '/populations/edit';

  constructor(
    private readonly populationsSrv: PopulationsService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(populationsSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      name:[''],
      country: [''],
      province: [''],
      active: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPopulations' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.loading = true;
    this.loadAll();
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
    super.searchDataBase(payload);
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
