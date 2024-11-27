import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { TaxesService } from '../taxes.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';

@Component({
  selector: 'app-taxes-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './taxes-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class TaxesAddEditComponent extends BaseAddEditComponent {

  taxesSrv:any;

  constructor() {
    super();
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/taxes/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
  }

  override ngOnInit(): void {
    this.taxesSrv = this.baseSrv as TaxesService;
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
      this.taxesSrv.getById(payload).subscribe({
        next:((res:any) => {
          this.model = { ...res.data};
        }),
        error: () => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar el Registro.!!!' : 'Error getting data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept';
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel'
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
            key: 'title',
            props: {
              required: true,
              label: 'FORM.FIELDS.TITLE',
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
            type: 'input',
            key: 'value',
            props: {
              label: 'FORM.FIELDS.VALUE',
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
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'equivalentSurcharge',
            props: {
              label: 'FORM.FIELDS.SURCHARGE',
              required:true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              },
            }
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isIGIC',
            props: {
              label: 'FORM.FIELDS.ISIGIC',
              required:false
            },
          },
        ],
      },
    ];
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.TITLE').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.VALUE').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SURCHARGE').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ISIGIC').subscribe((label:any) => {
      this.fields[2].fieldGroup[1].props.label = label;
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
    const myobs = this.id === 0 ? this.taxesSrv.add(payload) : this.taxesSrv.edit(payload);
    myobs.subscribe({
      next: (res:any) => {
        if (res.success === true) {
          openSnackBar(this.matSnackBar,this.translate.instant('save_ok'), this.translate.currentLang);
        } else {
          HandleMessagesSubmit(this.translate, res.error);
        }
        //Aqui tengo que preguntar si nuevo = true
        //Para limpiar el formulario
        //y permanecer en la ventana
        if (res.success === true) {
          if (this.showinNewTab) {
            localStorage.setItem('dataModifiedInNewTabtaxes', 'true');
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
