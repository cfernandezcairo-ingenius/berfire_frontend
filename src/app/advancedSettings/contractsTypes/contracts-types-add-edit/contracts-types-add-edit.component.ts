import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { ContractsTypesService } from '../contracts-types.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';

@Component({
  selector: 'app-contracts-types-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, CommonModule, SpinnerComponent, TranslateModule],
  templateUrl: './contracts-types-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class ContractsTypesAddEditComponent extends BaseAddEditComponent {

  contractsTypesSrv:any;

  constructor(

  ) {
    super();
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/contracts-types/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
  }

  override ngOnInit(): void {
    this.contractsTypesSrv = this.baseSrv as ContractsTypesService;
    this.id = this.contractsTypesSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isWarning: false
      }
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      this.contractsTypesSrv.getById(payload).subscribe({
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
            className: 'col-sm-12 col-md-12 col-lg-12',
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
            type: 'input',
            key: 'duration',
            props: {
              label: 'FORM.FIELDS.DURATION',
              required:true
            },
            validators: {
              validation: ['required','number'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
                number: this.translate.get('FORM.VALIDATION.NUMBER')
              },
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isWarning',
            props: {
              label: 'FORM.FIELDS.ISWARNING',
              required:true
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
      }

    ];
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DURATION').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ISWARNING').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
  }

  override updateValidationMessages() {
    this.fields.forEach((field:any) => {
      if (field.fieldGroup) {
        field.fieldGroup.forEach((fG: any) => {
          if (fG.validation?.messages) {
            fG.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
            fG.validation.messages.number = this.translate.instant('FORM.VALIDATION.NUMBER');
          }
        });
      } else if (field.validation?.messages) {
          field.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
          field.validation.messages.number = this.translate.instant('FORM.VALIDATION.NUMBER');
        }
    });
  }

  override onSubmit(model:any, nuevo: boolean = false) {
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
    const myobs = this.id === 0 ? this.contractsTypesSrv.add(payload) : this.contractsTypesSrv.edit(payload);
    myobs.subscribe({
      next: (res:any) => {
        if (res.success === true) {
          openSnackBar(this.matSnackBar,this.translate.instant('save_ok'), this.translate.currentLang);
        } else {
          HandleMessagesSubmit(this.translate, res.error);
        }
        if (res.success === true) {
          if (this.showinNewTab) {
            localStorage.setItem('dataModifiedInNewTabContractsTypes', 'true');
            this.showinNewTab = false
            if (!nuevo) window.close();
          } else if (nuevo) {
              this.fg.reset();
          } else {
            this.navigationService.goback();
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
    this.navigationService.goback();
    }
  }
}
