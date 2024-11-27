import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TaxesService } from '../taxes.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-taxes-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class TaxesDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly taxesSrv: TaxesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(taxesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.taxesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
