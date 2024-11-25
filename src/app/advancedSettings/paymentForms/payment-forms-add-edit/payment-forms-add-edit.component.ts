import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { PaymentFormsService } from '../payment-forms.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { showMessage } from '../../../share/common/UI/sweetalert2';

@Component({
  selector: 'app-payment-forms-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './payment-forms-add-edit.component.html',
  styleUrl: './payment-forms-add-edit.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService]
})
export class PaymentFormsAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  id: number = 0;
  darkMode:boolean = false;
  showinNewTab:boolean = false;
  shoWButtonSaveAndNew: boolean = false;
  loading = false;

  constructor(
    private readonly translate: TranslateService,
    public readonly navigationService: NavigationService,
    private readonly paymentFormsSrv: PaymentFormsService,
    private readonly darkModeService: StyleManager,
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar
  ) {
    this.translate.onLangChange.subscribe(ch=> {
      this.model.lang = this.translate.currentLang;
      this.updateLabels();
      this.updateValidationMessages();
    })
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
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
  }

  ngOnInit(): void {
    this.id = this.paymentFormsSrv._idToEdit;
    if (this.id === 0) {
      //Agregar
      //this.title = this.translate.instant('addItem');
      this.model = {
        home: false,
        days: 0
      }
      this.shoWButtonSaveAndNew = true;
    } else {
      //edit
      //this.title = this.translate.instant('editItem');
      let payload = {
        id: this.id
      }
      this.loading = true;
      this.paymentFormsSrv.getById(payload).subscribe({
        next:(res => {
          this.model = { ...res.data};
        }),
        error: () => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar el Registro.!!!' : 'Error getting data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept'
          showMessage(title, text,'error',true,false,confirmButtonText)
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
            key: 'days',
            props: {
              label: 'FORM.FIELDS.DAYS',
              type: 'number',
              step: 1,
              required: true,
              min: 0,
              max: 999,
            },
            validators: {
              validation: ['required', 'number'],
            },
            validation: {
              messages: {
                number: this.translate.get('FORM.VALIDATION.NUMBER'),
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'home',
            props: {
              label: 'FORM.FIELDS.HOME',
              required:false
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
    this.translate.get('FORM.FIELDS.DAYS').subscribe((label) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.HOME').subscribe((label) => {
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

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        days: Number(this.fg.get('days')?.value),
        home: this.fg.get('home')?.value === undefined ? false : this.fg.get('home')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        days: Number(this.fg.get('days')?.value),
        home: this.fg.get('home')?.value,
      }
    }
    const myobs = this.id === 0 ? this.paymentFormsSrv.add(payload) : this.paymentFormsSrv.edit(payload);
    myobs.subscribe({
      next: (res) => {
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
            localStorage.setItem('dataModifiedInNewTabPaymentForms', 'true');
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
