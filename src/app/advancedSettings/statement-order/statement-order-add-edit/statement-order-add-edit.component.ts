import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { StatementOrderService } from '../statement-order.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsStatementOrder } from './statement-order-add-edit-fields';

@Component({
  selector: 'app-statement-order-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './statement-order-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class StatementOrdersAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabStatementOrder';


  constructor(
    private readonly statementOrderSrv: StatementOrderService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,statementOrderSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/statement-order/edit/new');
      }
    });
    this.fields = generateFieldsStatementOrder(translate);
  }

  override ngOnInit(): void {

    let getId = this.getIdToEdit();
    this.id = getId.id;
    this.showinNewTab = getId.newTab;
    if (this.id === 0 && !this.showinNewTab) {
      this.shoWButtonSaveAndNew = true;
    } else {
      this.shoWButtonSaveAndNew = false
    }
    this.loading = true;
    super.getRegisterBase({id: this.id});
  }

  override updateLabels() {
    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.FINALIZED').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value === undefined ? null : this.fg.get('description')?.value,
        finalized: this.fg.get('finalized')?.value === undefined ? false : this.fg.get('finalized')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value,
        finalized: this.fg.get('finalized')?.value,
      }

    }
    super.onSubmitBase(payload);;
  }

  onCancel() {
    super.onCancelBase();
  }
}
