import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { ContractsTypesService } from '../contracts-types.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-contracts-types-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, CommonModule, SpinnerComponent, TranslateModule],
  templateUrl: './contracts-types-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class ContractsTypesAddEditComponent extends BaseAddEditComponent {


  constructor(
    private readonly contractsTypesSrv: ContractsTypesService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override  readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,contractsTypesSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/contracts-types/edit/new');
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
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'duration',
            props: {
              label: 'FORM.FIELDS.DURATION',
              required:true
            },
            validators: {
              validation: ['required','number'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
                number: this.translate.get('FORM.VALIDATION.NUMBER')
              },
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isWarning',
            props: {
              label: 'FORM.FIELDS.ISWARNING',
              required:true
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
      }

    ];
  }

  override ngOnInit(): void {
    this.id = this.contractsTypesSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isWarning: false
      }
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
    this.translate.get('FORM.FIELDS.DURATION').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ISWARNING').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
  }

  updateValidationMessages(fields:any) {
    super.updateValidationMessagesBase(fields);
  }

  onSubmit(model:any, nuevo: boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        duration: Number(this.fg.get('duration')?.value),
        isWarning:  this.fg.get('isWarning')?.value === undefined ? false : this.fg.get('isWarning')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        duration: Number(this.fg.get('duration')?.value),
        isWarning:  this.fg.get('isWarning')?.value
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
