import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { TechnicalsService } from '../technicals.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-technicals-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './technicals-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class TechnicalsAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabTechnicals';

  constructor(
    private readonly technicalsSrv: TechnicalsService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,technicalsSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/technicals/edit/new');
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
            key: 'firstSurname',
            props: {
              label: 'FORM.FIELDS.FIRSTSURNAME',
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
          },
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'secondSurName',
            props: {
              label: 'FORM.FIELDS.SECONDSURNAME',
              required:false
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'user',
            props: {
              label: 'FORM.FIELDS.USER',
              required:false
            },
          },
        ],
      },
    ];
  }

  override ngOnInit(): void {
    this.id = this.technicalsSrv._idToEdit;
    if (this.id === 0) {
      this.shoWButtonSaveAndNew = true;
      this.model = {

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

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label: any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.FIRSTSURNAME').subscribe((label: any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SECONDSURNAME').subscribe((label: any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.USER').subscribe((label: any) => {
      this.fields[2].fieldGroup[0].props.label = label;
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
        firstSurname: this.fg.get('firstSurname')?.value,
        secondSurName: this.fg.get('secondSurName')?.value,
        user: Number(this.fg.get('user')?.value)
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        firstSurname: this.fg.get('firstSurname')?.value,
        secondSurName: this.fg.get('secondSurName')?.value,
        user: Number(this.fg.get('user')?.value)
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase()
  }
}
