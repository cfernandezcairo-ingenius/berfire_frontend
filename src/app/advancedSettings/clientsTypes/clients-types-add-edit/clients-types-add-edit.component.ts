import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateService , TranslateModule } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { ClientsTypesService } from '../clients-types.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsClientsTypes } from './clients-types-add-edit-fields';

@Component({
  selector: 'app-contracts-types-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './clients-types-add-edit.component.html',
  styles: ''
  ,
providers: [TranslateService]
})
export class ClientsTypesAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabClientsTypes';

  constructor(
    private readonly clientsTypesSrv: ClientsTypesService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,clientsTypesSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/clients-types/edit/new');
      }
    });
    this.id = 0;
    this.fields = generateFieldsClientsTypes(translate);
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
        description: this.fg.get('description')?.value
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
