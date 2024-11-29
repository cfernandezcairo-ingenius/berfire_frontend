import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { TaxesService } from '../taxes.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsTaxes } from './taxes-add-edit-fields';

@Component({
  selector: 'app-taxes-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './taxes-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class TaxesAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabTaxes';

  constructor(
    private readonly taxesSrv: TaxesService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,taxesSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/taxes/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsTaxes(translate);
  }

  override ngOnInit(): void {
    this.id = this.taxesSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isIGIC: false,
      }
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      super.getRegisterBase(payload);
      this.shoWButtonSaveAndNew = false;
    }
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    //let myobs = new Observable<any>;
    if (this.id === 0) {
      payload = {
        title: this.fg.get('title')?.value,
        value: this.fg.get('value')?.value,
        equivalentSurcharge: this.fg.get('equivalentSurcharge')?.value,
        isIGIC: this.fg.get('isIGIC')?.value === undefined ? false : this.fg.get('isIGIC')?.value,
      }
    } else {
      payload = {
        id: this.id,
        title: this.fg.get('title')?.value,
        value: this.fg.get('value')?.value,
        equivalentSurcharge: this.fg.get('equivalentSurcharge')?.value,
        isIGIC: this.fg.get('isIGIC')?.value,
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
