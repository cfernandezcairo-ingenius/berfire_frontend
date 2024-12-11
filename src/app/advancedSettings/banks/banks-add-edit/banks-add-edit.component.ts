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

    let inputs = localStorage.getItem('_idToEdit');
    let tmp = JSON.parse(inputs!);
    this.id = tmp.id;
    this.showinNewTab = tmp.newTab;
    if (this.id === 0 && !this.showinNewTab) {
      this.shoWButtonSaveAndNew = true;
    } else {
      this.shoWButtonSaveAndNew = false
    }
    this.loading = true;
    super.getRegisterBase({id: this.id});
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
