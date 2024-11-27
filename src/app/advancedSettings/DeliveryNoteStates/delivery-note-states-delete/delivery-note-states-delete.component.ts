import { Component } from '@angular/core';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { DeliveryNoteStatesService } from '../delivery-note-states.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-delivery-note-states-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService, TranslateStore]
})
export class DeliveryNoteStatesDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly deliveryNoteStatesSrv: DeliveryNoteStatesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(deliveryNoteStatesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.deliveryNoteStatesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
