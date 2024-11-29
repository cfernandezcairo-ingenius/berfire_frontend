import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrTypesService } from '../prTypes.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsPrTypes } from './prTypes-add-edit-fields';

@Component({
  selector: 'app-prTypes-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './prTypes-add-edit.component.html',
  styleUrl: './prTypes-add-edit.component.scss',
  providers: [TranslateService]
})
export class PrTypesAddEditComponent extends BaseAddEditComponent {


  constructor(
    private readonly prTypesSrv: PrTypesService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,prTypesSrv,matSnackBar);
    this.fields =generateFieldsPrTypes(translate);
  }

  override ngOnInit(): void {
    this.id = this.prTypesSrv._idToEdit;
     this.shoWButtonSaveAndNew = this.id === 0;
    if (this.id !== 0) {
      this.loading = true;
      super.getRegisterBase({ id: this.id});
    }
    this.updateLabels();
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};

    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        teamName: this.fg.get('teamName')?.value,
        teamTitle: this.fg.get('teamTitle')?.value,
        description: this.fg.get('description')?.value === undefined ? null : this.fg.get('description')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        teamName: this.fg.get('teamName')?.value,
        teamTitle: this.fg.get('teamTitle')?.value,
        description: this.fg.get('description')?.value === undefined ? null : this.fg.get('description')?.value,
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
