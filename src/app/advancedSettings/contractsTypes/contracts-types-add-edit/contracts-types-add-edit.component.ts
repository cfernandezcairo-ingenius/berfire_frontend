import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { ContractsTypesService } from '../contracts-types.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsContractsTypes } from './contracts-types-add-edit-fields';

@Component({
  selector: 'app-contracts-types-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, CommonModule, SpinnerComponent, TranslateModule],
  templateUrl: './contracts-types-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class ContractsTypesAddEditComponent extends BaseAddEditComponent {


  override dataModifiedInNewTab = 'dataModifiedInNewTabContractsTypes';

  constructor(
    private readonly contractsTypesSrv: ContractsTypesService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override  readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,contractsTypesSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.showinNewTab = this.router.url.includes('/contracts-types/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsContractsTypes(translate);
  }

  override ngOnInit(): void {

    let inputs = localStorage.getItem!('_idToEdit');
    let tmp = JSON.parse(inputs!);
    this.id = tmp.id;
    this.showinNewTab = tmp.newTab;
    if (this.id === 0 && !this.showinNewTab) {
      this.shoWButtonSaveAndNew = true;
    } else {
      this.shoWButtonSaveAndNew = false
    }
    this.loading = true;
    super.getRegisterBase({id: this.id});
  }

  onSubmit(model:any, nuevo: boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        duration: Number(this.fg.get('duration')?.value),
        isWarning:  this.fg.get('isWarning')?.value === undefined ? false : this.fg.get('isWarning')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        duration: Number(this.fg.get('duration')?.value),
        isWarning:  this.fg.get('isWarning')?.value
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
