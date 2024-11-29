import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrIncidentsService } from '../prIncidents.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsPrIncidents } from './prIncidents-add-edit-fields';

@Component({
  selector: 'app-prIncidents-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './prIncidents-add-edit.component.html',
  styleUrl: './prIncidents-add-edit.component.scss',
  providers: [TranslateService]
})
export class PrIncidentsAddEditComponent extends BaseAddEditComponent {


  constructor(
    private readonly prIncidentsSrv: PrIncidentsService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,prIncidentsSrv,matSnackBar);
    this.fields = generateFieldsPrIncidents(translate);
  }

  override ngOnInit(): void {
    this.id = this.prIncidentsSrv._idToEdit;
     this.shoWButtonSaveAndNew = this.id === 0;
    this.loading = true;
    super.getRegisterBase({id: this.id});
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.CODE').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ORDER').subscribe((label: any) => {
      this.fields[0].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PERIODICITY').subscribe((label: any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label: any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.REPORT').subscribe((label: any) => {
      this.fields[3].fieldGroup[0].props.label = label;
    });
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};

    if (this.id === 0) {
      payload = {
        code: this.fg.get('code')?.value,
        order: Number(this.fg.get('order')?.value),
        periodicity: this.fg.get('periodicity')?.value,
        description: this.fg.get('description')?.value,
        report: this.fg.get('report')?.value,
      }
    } else {
      payload = {
        id: this.id,
        code: this.fg.get('code')?.value,
        order: Number(this.fg.get('order')?.value),
        periodicity: this.fg.get('periodicity')?.value,
        description: this.fg.get('description')?.value,
        report: this.fg.get('report')?.value,
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
