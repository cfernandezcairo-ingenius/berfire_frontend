import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PopulationsService } from '../populations.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
@Component({
  selector: 'app-populations-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class PopulationsDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly populationsSrv: PopulationsService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(populationsSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.populationsSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
