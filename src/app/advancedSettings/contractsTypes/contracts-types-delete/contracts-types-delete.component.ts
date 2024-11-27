import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ContractsTypesService } from '../contracts-types.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-contracts-types-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class ContractsTypesDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly contractsTypesSrv: ContractsTypesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(contractsTypesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.contractsTypesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
