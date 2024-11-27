import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { BillStatusService } from '../bill-status.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-bill-status-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './bill-status-add-edit.component.html',
  styleUrl: './bill-status-add-edit.component.scss'
  ,
providers: [TranslateService]
})
export class BillStatusAddEditComponent extends BaseAddEditComponent {

  constructor(
    private readonly billStatusSrv: BillStatusService,
    public override  readonly translate: TranslateService,
    public readonly matSnackBar: MatSnackBar,
    public readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/invoice-status/edit/new');
      }
    });

  }

  override ngOnInit(): void {
    this.id = this.billStatusSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isPaid: false,
        isReturned: false,
        isSent: false,
        isUnPaid:false,
        isPending:false
      }
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      this.billStatusSrv.getById(payload).subscribe({
        next:(res:any) => { this.model = { ...res.data};},
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
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isPaid',
            props: {
              label: 'FORM.FIELDS.PAID',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isReturned',
            props: {
              label: 'FORM.FIELDS.RETURNED',
              required:false
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isPending',
            props: {
              label: 'FORM.FIELDS.PENDING',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isSent',
            props: {
              label: 'FORM.FIELDS.SENT',
              required:false
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'checkbox',
            key: 'isUnPaid',
            props: {
              label: 'FORM.FIELDS.NOTPAID',
              required:false
            }
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
    this.translate.get('FORM.FIELDS.PAID').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.RETURNED').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PENDING').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SENT').subscribe((label:any) => {
      this.fields[2].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.NOTPAID').subscribe((label:any) => {
      this.fields[3].fieldGroup[0].props.label = label;
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

  override onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        isPaid: this.fg.get('isPaid')?.value === undefined ? false : this.fg.get('isPaid')?.value,
        isReturned: this.fg.get('isReturned')?.value === undefined ? false : this.fg.get('isReturned')?.value,
        isPending: this.fg.get('isPending')?.value === undefined ? false : this.fg.get('isPending')?.value,
        isSent: this.fg.get('isSent')?.value === undefined ? false : this.fg.get('isSent')?.value,
        isUnPaid: this.fg.get('isUnPaid')?.value === undefined ? false : this.fg.get('isUnPaid')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        isPaid: this.fg.get('isPaid')?.value,
        isReturned: this.fg.get('isReturned')?.value,
        isSent: this.fg.get('isSent')?.value,
        isUnPaid: this.fg.get('isUnPaid')?.value,
        isPending: this.fg.get('isPending')?.value,
      }
    }
    const myobs = this.id === 0 ? this.billStatusSrv.add(payload) : this.billStatusSrv.edit(payload);
    myobs.subscribe({
      next: (res: any) => {
        if (res.success === true) {
          openSnackBar(this.matSnackBar,this.translate.instant('save_ok'), this.translate.currentLang);
        } else {
          HandleMessagesSubmit(this.translate, res.error);
        }
        if (res.success === true) {
          if (this.showinNewTab) {
            localStorage.setItem('dataModifiedInNewTabBillStatements', 'true');
            this.showinNewTab = false
            if (!nuevo) window.close();
          } else if (nuevo) {
              this.fg.reset();
          } else {
            this.navigationSrv.goback();
          }
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
