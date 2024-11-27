import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ClientsTypesService } from '../clients-types.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-clients-types-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class ClientsTypesDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly clientsTypesSrv: ClientsTypesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(clientsTypesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.clientsTypesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
