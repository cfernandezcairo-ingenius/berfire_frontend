import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StatementOrderService } from '../statement-order.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-statement-order-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class StatementOrderDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly statementOrderSrv: StatementOrderService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(statementOrderSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.statementOrderSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
