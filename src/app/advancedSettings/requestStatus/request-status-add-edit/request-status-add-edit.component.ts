import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { RequestStatusService } from '../request-status.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsRequestStatus } from './request-status-add-edit-fields';

@Component({
  selector: 'app-request-status-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './request-status-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class RequestStatusAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabRequestStatus';

  constructor(
    private readonly requestStatusSrv: RequestStatusService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,requestStatusSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/request-status/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsRequestStatus(translate);
  }

  override ngOnInit(): void {
    this.id = this.requestStatusSrv._idToEdit;
     this.shoWButtonSaveAndNew = this.id === 0;
    if (this.id !== 0) {
      let payload = {
        id: this.id
      }
      this.loading = true;
      super.getRegisterBase(payload);
    }
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        code: this.fg.get('code')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        code: this.fg.get('code')?.value,
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
