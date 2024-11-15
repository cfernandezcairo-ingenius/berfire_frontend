import { Component, OnInit } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { TaxesService } from '../taxes.service';
import Swal from 'sweetalert2';
import { StyleManager } from '../../../share/services/style-manager.service';
import { WindowService } from '../../../share/services/window.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';

@Component({
  selector: 'app-taxes-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule],
  templateUrl: './taxes-add-edit.component.html',
  styleUrl: './taxes-add-edit.component.scss'
})
export class TaxesAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  row:any;
  darkMode = false;
  showinNewTab = false;
  shoWButtonSaveAndNew = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly taxesSrv: TaxesService,
    private readonly darkModeService: StyleManager,
    private readonly router: Router,
    private readonly windowService: WindowService
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
        this.showinNewTab = this.router.url.includes('/taxes/edit/new');
      }
    });
  }

  ngOnInit(): void {
    if (this.row.id === 0) {
      //Agregar
      //this.title = this.translate.instant('addItem');
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isIGIC: false,
      }
    } else {
      //edit
      //this.title = this.translate.instant('editItem');
      this.model = { ...this.row};
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

  updateLabels() {

    this.translate.get('FORM.FIELDS.TITLE').subscribe((label) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.VALUE').subscribe((label) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SURCHARGE').subscribe((label) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ISIGIC').subscribe((label) => {
      this.fields[2].fieldGroup[1].props.label = label;
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
    //let myobs = new Observable<any>;
    if (this.row.id === 0) {
      payload = {
        title: this.fg.get('title')?.value,
        value: this.fg.get('value')?.value,
        equivalentSurcharge: this.fg.get('equivalentSurcharge')?.value,
        isIGIC: this.fg.get('isIGIC')?.value === undefined ? false : this.fg.get('isIGIC')?.value,
      }
    } else {
      payload = {
        id: this.row.id,
        title: this.fg.get('title')?.value,
        value: this.fg.get('value')?.value,
        equivalentSurcharge: this.fg.get('equivalentSurcharge')?.value,
        isIGIC: this.fg.get('isIGIC')?.value,
      }
    }
    const myobs = this.row.id === 0 ? this.taxesSrv.add(payload) : this.taxesSrv.edit(payload);
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
          Swal.fire({
            title: this.translate.instant('inform'),
            text: this.translate.instant('save_error'),
            icon: 'error',
            showConfirmButton:true,
            confirmButtonText: 'OK',
            background: this.darkMode ? '#444' : '#fff',
            color: this.darkMode ? '#fff' : '#000',
          })
        }
        //Aqui tengo que preguntar si nuevo = true
        //Para limpiar el formulario
        //y permanecer en la ventana
        if (this.showinNewTab) {
          localStorage.setItem('dataModifiedInNewTabtaxes', 'true');
          this.showinNewTab = false
          if (!nuevo) window.close();
        } else if (nuevo) {
            this.fg.reset();
          } else {
            this.navigationService.goback();
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
