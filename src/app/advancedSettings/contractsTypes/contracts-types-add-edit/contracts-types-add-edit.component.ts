import { Component, OnInit } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { ContractsTypesService } from '../contracts-types.service';
import Swal from 'sweetalert2';
import { StyleManager } from '../../../share/services/style-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contracts-types-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule],
  templateUrl: './contracts-types-add-edit.component.html',
  styleUrl: './contracts-types-add-edit.component.scss'
})
export class ContractsTypesAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  row:any;
  darkMode = false;
  showinNewTab = false;
  shoWButtonSaveAndNew = true;

  constructor(
    private readonly translate: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly contractsTypesSrv: ContractsTypesService,
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
        this.showinNewTab = this.router.url.includes('/contracts-types/edit/new');
      }
    });
  }

  ngOnInit(): void {
    if (this.row.id === 0) {
      //Agregar
      //this.title = this.translate.instant('addItem');
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isWarning: false
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

  updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DURATION').subscribe((label) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ISWARNING').subscribe((label) => {
      this.fields[1].fieldGroup[1].props.label = label;
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

  onSubmit(model:any, nuevo: boolean = false) {
    let payload = {};
    if (this.row.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        duration: Number(this.fg.get('duration')?.value),
        isWarning:  this.fg.get('isWarning')?.value === undefined ? false : this.fg.get('isWarning')?.value,
      }
    } else {
      payload = {
        id: this.row.id,
        duration: Number(this.fg.get('duration')?.value),
        isWarning:  this.fg.get('isWarning')?.value
      }
    }
    const myobs = this.row.id === 0 ? this.contractsTypesSrv.add(payload) : this.contractsTypesSrv.edit(payload);
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
          localStorage.setItem('dataModifiedInNewTabContractsTypes', 'true');
          this.showinNewTab = false
          if (!nuevo) window.close();
        } else if (nuevo) {
            this.fg.reset();
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
