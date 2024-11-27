import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PVPRatesService } from '../pvp-rates.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-pvp-rates-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class PvpRatesDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly pVPRatesSrv: PVPRatesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(pVPRatesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.pVPRatesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
