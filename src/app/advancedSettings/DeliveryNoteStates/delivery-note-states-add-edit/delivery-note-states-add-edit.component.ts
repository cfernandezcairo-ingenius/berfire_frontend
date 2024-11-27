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

@Component({
  selector: 'app-delivery-note-states-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule,CommonModule, SpinnerComponent],
  templateUrl: './delivery-note-states-add-edit.component.html',
  styleUrl: './delivery-note-states-add-edit.component.scss',
  providers: [TranslateService]
})
export class DeliveryNoteStatesAddEditComponent extends BaseAddEditComponent {


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
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-126 col-lg-12',
            type: 'input',
            key: 'name',
            props: {
              required: true,
              label: 'FORM.FIELDS.FIRSTNAME',
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              },
            },
          }
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'checkbox',
            key: 'confirmDeliveryNote',
            props: {
              label: 'FORM.FIELDS.CONFIRM',
              required:false
            },
          },
        ],
      }
    ];
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

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.CONFIRM').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
  }

  updateValidationMessages(fields:any) {
    super.updateValidationMessagesBase(fields);
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
