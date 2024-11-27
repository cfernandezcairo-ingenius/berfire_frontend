import { Component } from '@angular/core';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { PrTypesService } from '../prTypes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-prTypes-deletePr',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: []
})
export class PrTypesDeleteComponent extends BaseDeleteComponent {


  constructor(
    private readonly prTypesSrv: PrTypesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(prTypesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.prTypesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
