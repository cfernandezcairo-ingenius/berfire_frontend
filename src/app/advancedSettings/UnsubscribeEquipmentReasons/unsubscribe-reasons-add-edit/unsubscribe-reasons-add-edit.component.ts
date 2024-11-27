import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { UnsubscribeReasonsService } from '../unsubscribe-reasons.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-unsubscribe-reasons-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './unsubscribe-reasons-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class UnsubscribeReasonsAddEditComponent extends BaseAddEditComponent {


  constructor(
    private readonly unsubscribeReasonsSrv: UnsubscribeReasonsService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,unsubscribeReasonsSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/unsubscribe-reasons/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'name',
            props: {
              required: true,
              label: 'FORM.FIELDS.FIRSTNAME',
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              },
            },
          }
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'description',
            props: {
              label: 'FORM.FIELDS.DESCRIPTION',
              required:false
            },
          }
        ],
      }

    ];
  }

  override ngOnInit(): void {
    this.id = this.unsubscribeReasonsSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
    } else {
      let payload = {
        id: this.id
      }
      this.loading = true;
      super.getRegisterBase(payload);
      this.shoWButtonSaveAndNew = false;
    }
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });

  }

  updateValidationMessages() {
    super.updateValidationMessagesBase(this.fields);
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value,
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
