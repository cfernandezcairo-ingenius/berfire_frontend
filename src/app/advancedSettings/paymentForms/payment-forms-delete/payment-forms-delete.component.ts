import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PaymentFormsService } from '../payment-forms.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
@Component({
  selector: 'app-payment-forms-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class PaymentFormsDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly paymentFormsSrv: PaymentFormsService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(paymentFormsSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.paymentFormsSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
