import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BanksService } from '../banks.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsBanks } from './banks-add-edit-fields';

@Component({
  selector: 'app-banks-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './banks-add-edit.component.html',
  styleUrl: './banks-add-edit.component.scss',
  providers: [TranslateService]
})
export class BanksAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabBanks';

  constructor(
    private readonly banksSrv: BanksService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router,
  ) {
    super(translate, navigationSrv,banksSrv,matSnackBar);
    this.fields = generateFieldsBanks(translate);
  }

  override ngOnInit(): void {
    this.id = this.banksSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
    }
    this.loading = true;
    super.getRegisterBase({id: this.id});
    this.shoWButtonSaveAndNew = false;

    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SWIFT').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.IBAN').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
  }

  updateValidationMessages(fields:any) {
    super.updateValidationMessagesBase(fields);
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        swift: this.fg.get('swift')?.value,
        iban: Number(this.fg.get('iban')?.value)
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        swift: this.fg.get('swift')?.value,
        iban: Number(this.fg.get('iban')?.value)
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
