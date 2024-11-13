import { Component, OnInit } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { AlbaranesService } from '../albaranes.service';
import Swal from 'sweetalert2';
import { StyleManager } from '../../../share/services/style-manager.service';

@Component({
  selector: 'app-albaranes-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent],
  templateUrl: './albaranes-add-edit.component.html',
  styleUrl: './albaranes-add-edit.component.scss'
})
export class AlbaranesAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  row:any;
  darkMode = false;
  showinNewTab = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly albaranesSrv: AlbaranesService,
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
        this.showinNewTab = this.router.url.includes('/invoice/edit/new');
      }
    });
  }

  ngOnInit(): void {
    if (this.row.id === 0) {
      //Agregar
      //this.title = this.translate.instant('addItem');
    } else {
      //edit
      //this.title = this.translate.instant('editItem');
      this.model = { ...this.row};
    }

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
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
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'lastname',
            props: {
              label: 'FORM.FIELDS.LASTNAME',
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
            expressionProperties: {
              'props.disabled': '!model.name',
            },
          },
        ],
      },
      // {
      //   className: 'section-label',
      //   template: '<hr /><div><strong>Address:</strong></div>',
      // },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'address',
            props: {
              label: 'FORM.FIELDS.ADDRESS',
              maxLength: 30
            },
            validators: {
              validation: [ { name: 'maxLength', options: { maxLength: 30 } },],
            },
            validation: {
              messages: {
                maxLength: () => this.translate.get('FORM.VALIDATION.MAX_LENGTH', { maxLength: 30 }),
              },
            },
          },
          // {
          //   className: 'col-sm-6 col-md-3 col-lg-3',
          //   type: 'input',
          //   key: 'cityName',
          //   props: {
          //     label: 'City',
          //   },
          // },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'mobile',
            props: {
              label: 'FORM.FIELDS.MOBILE',
            },
            validators: {
              validation: ['mobile'],
            },
            validation: {
              messages: {
                email: () => this.translate.get('FORM.VALIDATION.MOBILE'),
              },
            }
          }
        ],
      },
      { template: '<hr />' },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'email',
            props: {
              label: 'FORM.FIELDS.EMAIL',
            },
            validators: {
              validation: ['email'],
            },
            validation: {
              messages: {
                email: () => this.translate.get('FORM.VALIDATION.EMAIL'),
              },
            },
          }],
          // {
          //   className: 'col-sm-12 col-md-6 col-lg-6',
          //   key: 'passwordToggle',
          //   type: 'passwordToggleVisible',
          // }],
        }
    ];
    this.updateLabels();
  }

  updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.LASTNAME').subscribe((label) => {
      this.fields[0].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ADDRESS').subscribe((label) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.MOBILE').subscribe((label) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.EMAIL').subscribe((label) => {
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

  onSubmit(model:any) {
    let payload = {};
    if (this.row.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        lastname: this.fg.get('lastname')?.value,
        email: this.fg.get('email')?.value,
        address: this.fg.get('address')?.value,
        mobile: this.fg.get('mobile')?.value,
      }
    } else {
      payload = {
        id: this.row.id,
        name: this.fg.get('name')?.value,
        lastname: this.fg.get('lastname')?.value,
        email: this.fg.get('email')?.value,
        address: this.fg.get('address')?.value,
        mobile: this.fg.get('mobile')?.value,
      }
    }
    const myobs = this.row.id === 0 ? this.albaranesSrv.add(payload) : this.albaranesSrv.edit(payload)
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
        if (this.showinNewTab) {
          localStorage.setItem('dataModifiedInNewTab', 'true');
          window.close();
        } else {
          this.navigationService.goback();
        }
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire({
          title: this.translate.instant('inform'),
          text: this.translate.instant('save_error'),
          icon: 'error',
          showConfirmButton:true,
          confirmButtonText: 'OK',
          background: this.darkMode ? '#444' : '#fff',
          color: this.darkMode ? '#fff' : '#000',
        })
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
