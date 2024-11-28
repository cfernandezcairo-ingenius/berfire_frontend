import { Component } from '@angular/core';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { PrIncidentsService } from '../prIncidents.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-prIncidents-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: []
})
export class PrIncidentsDeleteComponent extends BaseDeleteComponent {


  constructor(
    private readonly prIncidentsSrv: PrIncidentsService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(prIncidentsSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.prIncidentsSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
