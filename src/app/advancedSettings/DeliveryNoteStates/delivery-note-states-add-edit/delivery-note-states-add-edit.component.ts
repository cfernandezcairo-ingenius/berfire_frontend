import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { DeliveryNoteStatesService } from '../delivery-note-states.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { showMessage } from '../../../share/common/UI/sweetalert2';
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
    public readonly matSnackBar: MatSnackBar,
    public readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/delivery-note-states/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
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
      this.deliveryNoteStatesSrv.getById(payload).subscribe({
        next:((res:any) => {
          this.model = { ...res.data};
        }),
        error: () => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar el Registro.!!!' : 'Error getting data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept'
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel';
          showMessage(title, text,'error',true,false,confirmButtonText, cancelButtonText)
        },
        complete: () => {
          this.loading = false;
        }
      });
      this.shoWButtonSaveAndNew = false;
    }

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

  override updateValidationMessages() {
    this.fields.forEach((field:any) => {
      if (field.fieldGroup) {
        field.fieldGroup.forEach((fG: any) => {
          if (fG.validation?.messages) {
            fG.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
          }
        });
      } else if (field.validation?.messages) {
          field.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
        }
    });
  }

  override onSubmit(model:any) {
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
    const myobs = this.id === 0 ? this.deliveryNoteStatesSrv.add(payload) : this.deliveryNoteStatesSrv.edit(payload)
    myobs.subscribe({
      next: (res:any) => {
        if (res.success === true) {
          openSnackBar(this.matSnackBar,this.translate.instant('save_ok'), this.translate.currentLang);
        } else {
          HandleMessagesSubmit(this.translate, res.error);
        }
        if (this.showinNewTab) {
          localStorage.setItem('dataModifiedInNewTabDeliveryNoteStates', 'true');
          window.close();
        } else {
          this.navigationSrv.goback();
        }
      },
      error: (error:any) => {
        HandleMessagesSubmit(this.translate, error);
      },
    });
  }

  override onCancel() {
    if (this.showinNewTab) {
      window.close();
    } else {
    //Aqui tengo que regresar a la ultima ruta
    this.navigationSrv.goback();
    }
  }
}
