import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { TaxesService } from '../taxes.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { getLabelsTaxesEn, getLabelsTaxesEs } from './labels';

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
export class TaxesListComponent extends BaseListComponent {

  override dataSource = {
    data: [] as ITaxes[]
  };
  payload: any;

  override displayedLabels:IDisplayedLabels[] = getLabelsTaxesEs();
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn:IDisplayedLabels[] = getLabelsTaxesEn();

  fg: FormGroup;

  override newRoute: string = '/taxes/edit';
  override newRouteToDelete:string = 'taxes/delete';

  constructor(
    private readonly taxesSrv: TaxesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(taxesSrv, translate, matSnackBar,navigationSrv);
    this.fg = this.fb.group({
      title: [''],
      value: [''],
      equivalentSurcharge: [''],
      isIGIC: ['']
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTaxes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }
   override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabTaxes', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }

  searchData(event: ITaxes) {

    let payload = `?title=${event.title}`;
    if (event.value) {
      payload = payload + `&value=${event.value}`;
    }
    if (event.equivalentSurcharge) {
      payload = payload + `&equivalentSurcharge=${event.equivalentSurcharge}`;
    }
    if (event.isIGIC) {
      payload = payload + `&isIGIC=${event.isIGIC}`;
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
