import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { BillStatusService } from '../bill-status.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsBillStatus } from './bill-status-add-edit-fields';

@Component({
  selector: 'app-bill-status-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './bill-status-add-edit.component.html',
  styleUrl: './bill-status-add-edit.component.scss'
  ,
providers: [TranslateService]
})
export class BillStatusAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabBillStatements';

  constructor(
    private readonly billStatusSrv: BillStatusService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,billStatusSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.showinNewTab = this.router.url.includes('/invoice-status/edit/new');
      }
    });
    this.fields = generateFieldsBillStatus(translate);
  }

  override ngOnInit(): void {
    this.id = this.billStatusSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isPaid: false,
        isReturned: false,
        isSent: false,
        isUnPaid:false,
        isPending:false
      }
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      super.getRegisterBase(payload);
      this.shoWButtonSaveAndNew = false;
    }
    //getLabelsUpdateBillUpdate(this.translate, this.fields);
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        isPaid: this.fg.get('isPaid')?.value === undefined ? false : this.fg.get('isPaid')?.value,
        isReturned: this.fg.get('isReturned')?.value === undefined ? false : this.fg.get('isReturned')?.value,
        isPending: this.fg.get('isPending')?.value === undefined ? false : this.fg.get('isPending')?.value,
        isSent: this.fg.get('isSent')?.value === undefined ? false : this.fg.get('isSent')?.value,
        isUnPaid: this.fg.get('isUnPaid')?.value === undefined ? false : this.fg.get('isUnPaid')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        isPaid: this.fg.get('isPaid')?.value,
        isReturned: this.fg.get('isReturned')?.value,
        isSent: this.fg.get('isSent')?.value,
        isUnPaid: this.fg.get('isUnPaid')?.value,
        isPending: this.fg.get('isPending')?.value,
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
