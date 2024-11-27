import { Component, ViewEncapsulation } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { PaymentFormsService } from '../payment-forms.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-payment-forms-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './payment-forms-add-edit.component.html',
  styleUrl: './payment-forms-add-edit.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService]
})
export class PaymentFormsAddEditComponent extends BaseAddEditComponent {

  constructor(
    private readonly paymentFormsSrv: PaymentFormsService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,paymentFormsSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/payment-form/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
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
  }

  override ngOnInit(): void {
    this.id = this.paymentFormsSrv._idToEdit;
    if (this.id === 0) {
      this.model = {
        home: false,
        days: 0
      }
      this.shoWButtonSaveAndNew = true;
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      super.getRegisterBase(payload);
      this.shoWButtonSaveAndNew = false;
    }
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DAYS').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.HOME').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
  }

  updateValidationMessages(fields:any) {
    super.updateValidationMessagesBase(fields);
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
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
