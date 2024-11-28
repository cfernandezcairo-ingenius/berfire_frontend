import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RequestStatusService } from '../request-status.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-request-status-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class RequestStatusDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly requestStatusSrv: RequestStatusService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(requestStatusSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.requestStatusSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
