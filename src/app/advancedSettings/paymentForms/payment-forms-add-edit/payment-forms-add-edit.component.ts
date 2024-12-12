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
import { generateFieldsPaymentForms } from './payment-forms-add-edit-fields';

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

  override dataModifiedInNewTab = 'dataModifiedInNewTabPaymentForms';

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
    this.fields = generateFieldsPaymentForms(translate);
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
