import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UnsubscribeReasonsService } from '../unsubscribe-reasons.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-unsubscribe-reasons-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class UnsubscribeReasonsDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly unsubscribeReasonsSrv: UnsubscribeReasonsService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(unsubscribeReasonsSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.unsubscribeReasonsSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
