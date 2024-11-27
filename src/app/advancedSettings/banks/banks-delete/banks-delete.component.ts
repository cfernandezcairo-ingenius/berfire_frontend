import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BanksService } from '../banks.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-banks-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers:[TranslateService]
})
export class BanksDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly banksSrv: BanksService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(banksSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.banksSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
