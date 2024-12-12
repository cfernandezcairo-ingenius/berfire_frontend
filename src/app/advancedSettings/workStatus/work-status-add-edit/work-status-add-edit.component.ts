import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { WorkStatusService } from '../work-status.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsWorkStatus } from './work-status-add-edit-fields';
import { getPayloadWorkStatus } from '../util-work-status';

@Component({
  selector: 'app-work-status-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './work-status-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class WorkStatusAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabWorkStatus';

  constructor(
    private readonly workStatusSrv: WorkStatusService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,workStatusSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.showinNewTab = this.router.url.includes('/work-status/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsWorkStatus(translate);
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = getPayloadWorkStatus(this.id,this.fg);
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
