import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ManufacturersService } from '../manufacturers.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-manufacturers-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class ManufacturersDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly manufacturersSrv: ManufacturersService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(manufacturersSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.manufacturersSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
