import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BillStatusService } from '../bill-status.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bill-status-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers:[TranslateService]
})
export class BillStatusDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly billStatusSrv: BillStatusService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(billStatusSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.billStatusSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
