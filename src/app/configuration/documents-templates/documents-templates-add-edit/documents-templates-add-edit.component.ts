import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { DocumentsTemplatesService } from '../documents-templates.service';
import Swal from 'sweetalert2';
import { StyleManager } from '../../../share/services/style-manager.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';

@Component({
  selector: 'app-documents-templates-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './documents-templates-add-edit.component.html',
  styleUrl: './documents-templates-add-edit.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DocumentsTemplatesAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  row:any;
  darkMode = false;
  showinNewTab = false;
  shoWButtonSaveAndNew = false;
  loading = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly documentsTemplatesSrv: DocumentsTemplatesService,
    private readonly darkModeService: StyleManager,
    private readonly router: Router
  ) {
    this.translate.onLangChange.subscribe(ch=> {
      this.model.lang = this.translate.currentLang;
      this.updateLabels();
      this.updateValidationMessages();
    })
    this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.row = JSON.parse(params['id']);
    });
    this.fg.valueChanges.subscribe(v=> {
      //Aqui tengo los datos para cuando capture el submit
    });
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/payment-form/edit/new');
      }
    });
  }

  ngOnInit(): void {
    if (this.row.id === 0) {
      //Agregar
      //this.title = this.translate.instant('addItem');
      this.model = {
        predetermined: false,
      }
      this.shoWButtonSaveAndNew = true;
    } else {
      //edit
      //this.title = this.translate.instant('editItem');
      let payload = {
        id: this.row.id
      }
      this.loading = true;
      this.documentsTemplatesSrv.getById(payload).subscribe({
        next:(res => {
          this.model = { ...res.data};
        }),
        error: () => {
          Swal.fire({
            title: this.translate.instant('inform'),
            text: this.translate.currentLang === 'es' ? 'Error al cargar el Registro.!!!' : 'Error getting data!!',
            icon: 'error',
            showConfirmButton:true,
            showCancelButton: false,
            confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
            background: this.darkMode ? '#444' : '#fff',
            color: this.darkMode ? '#fff' : '#000',
          });
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

  updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEMPLATETYPE').subscribe((label) => {
      this.fields[0].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.RENDERTYPE').subscribe((label) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PREDETERMINED').subscribe((label) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEMPLATE').subscribe((label) => {
      this.fields[3].fieldGroup[0].props.label = label;
    });
  }

  updateValidationMessages() {
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

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.row.id === 0) {
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
        id: this.row.id,
        name: this.fg.get('name')?.value,
        templateType: this.fg.get('templateType')?.value,
        renderType: this.fg.get('renderType')?.value,
        predetermined: this.fg.get('predetermined')?.value === undefined ? false : this.fg.get('predetermined')?.value,
        description: this.fg.get('description')?.value,
        template: this.fg.get('template')?.value
      }
    }
    const myobs = this.row.id === 0 ? this.documentsTemplatesSrv.add(payload) : this.documentsTemplatesSrv.edit(payload);
    myobs.subscribe({
      next: (res) => {
        if (res.success === true) {
          Swal.fire({
            title: this.translate.instant('inform'),
            text: this.translate.instant('save_ok'),
            icon: 'success',
            showConfirmButton:true,
            confirmButtonText: 'OK',
            background: this.darkMode ? '#444' : '#fff',
            color: this.darkMode ? '#fff' : '#000',
          })
        } else {
            HandleMessagesSubmit(this.translate, res.error)
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
      error: (error) => {
        HandleMessagesSubmit(this.translate, error);
      },
    });
  }

  onCancel() {
    if (this.showinNewTab) {
      window.close();
    } else {
    //Aqui tengo que regresar a la ultima ruta
    this.navigationService.goback();
    }
  }
}