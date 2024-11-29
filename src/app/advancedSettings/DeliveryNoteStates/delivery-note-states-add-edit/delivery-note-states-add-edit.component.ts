import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { DeliveryNoteStatesService } from '../delivery-note-states.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsDeliveryNoteStates } from './delivery-note-states-add-edit-fields';

@Component({
  selector: 'app-delivery-note-states-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule,CommonModule, SpinnerComponent],
  templateUrl: './delivery-note-states-add-edit.component.html',
  styleUrl: './delivery-note-states-add-edit.component.scss',
  providers: [TranslateService]
})
export class DeliveryNoteStatesAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabDeliveryNoteStates';

  constructor(
    private readonly deliveryNoteStatesSrv: DeliveryNoteStatesService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,deliveryNoteStatesSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/delivery-note-states/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsDeliveryNoteStates(translate);
  }

  override ngOnInit(): void {
    this.id = this.deliveryNoteStatesSrv._idToEdit;
    if (this.id === 0) {
      this.model = {
        confirmDeliveryNote: false
      }
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      super.getRegisterBase(payload);
      this.shoWButtonSaveAndNew = false;
    }


    this.updateLabels();
  }

  onSubmit(model:any, nuevo: boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        confirmDeliveryNote: this.fg.get('confirmDeliveryNote')?.value === undefined ? null : this.fg.get('confirmDeliveryNote')?.value
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        confirmDeliveryNote: this.fg.get('confirmDeliveryNote')?.value === undefined ? false : this.fg.get('confirmDeliveryNote')?.value
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
