import { Component, ViewEncapsulation } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { DocumentsTemplatesService } from '../documents-templates.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';

@Component({
  selector: 'app-documents-templates-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './documents-templates-add-edit.component.html',
  styleUrl: './documents-templates-add-edit.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService, TranslateStore]
})
export class DocumentsTemplatesAddEditComponent extends BaseAddEditComponent {

  documentsTemplatesSrv:any;

    constructor() {
    super();
  }

  override ngOnInit(): void {
    this.documentsTemplatesSrv = this.baseSrv as DocumentsTemplatesService;
    this.id = this.documentsTemplatesSrv._idToEdit;
    if (this.id === 0) {
      this.model = {
        predetermined: false,
      }
      this.shoWButtonSaveAndNew = true;
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      this.documentsTemplatesSrv.getById(payload).subscribe({
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
          },
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'templateType',
            props: {
              required: true,
              label: 'FORM.FIELDS.TEMPLATETYPE',
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
            key: 'renderType',
            props: {
              label: 'FORM.FIELDS.RENDERTYPE',
              required: true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'predetermined',
            props: {
              label: 'FORM.FIELDS.PREDETERMINED',
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
            type: 'input',
            key: 'description',
            props: {
              label: 'FORM.FIELDS.DESCRIPTION',
              required: true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'template',
            props: {
              label: 'FORM.FIELDS.TEMPLATE',
              required: true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
        ],
      },
    ];
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEMPLATETYPE').subscribe((label:any) => {
      this.fields[0].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.RENDERTYPE').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PREDETERMINED').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEMPLATE').subscribe((label:any) => {
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
        templateType: this.fg.get('templateType')?.value,
        renderType: this.fg.get('renderType')?.value,
        predetermined: this.fg.get('predetermined')?.value === undefined ? false : this.fg.get('predetermined')?.value,
        description: this.fg.get('description')?.value,
        template: this.fg.get('template')?.value
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        templateType: this.fg.get('templateType')?.value,
        renderType: this.fg.get('renderType')?.value,
        predetermined: this.fg.get('predetermined')?.value === undefined ? false : this.fg.get('predetermined')?.value,
        description: this.fg.get('description')?.value,
        template: this.fg.get('template')?.value
      }
    }
    const myobs = this.id === 0 ? this.documentsTemplatesSrv.add(payload) : this.documentsTemplatesSrv.edit(payload);
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
            localStorage.setItem('dataModifiedInNewTabTemplates', 'true');
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
