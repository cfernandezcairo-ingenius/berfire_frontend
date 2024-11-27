import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StatesPartiesReviewService } from '../states-parties-review.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-states-parties-review-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class StatesPartiesReviewDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly statesPartiesReviewSrv: StatesPartiesReviewService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(statesPartiesReviewSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.statesPartiesReviewSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
