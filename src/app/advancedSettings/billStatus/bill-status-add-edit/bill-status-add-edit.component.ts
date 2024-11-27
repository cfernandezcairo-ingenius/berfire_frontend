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
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-126 col-lg-12',
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
            type: 'checkbox',
            key: 'isPaid',
            props: {
              label: 'FORM.FIELDS.PAID',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isReturned',
            props: {
              label: 'FORM.FIELDS.RETURNED',
              required:false
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isPending',
            props: {
              label: 'FORM.FIELDS.PENDING',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isSent',
            props: {
              label: 'FORM.FIELDS.SENT',
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
            type: 'checkbox',
            key: 'isUnPaid',
            props: {
              label: 'FORM.FIELDS.NOTPAID',
              required:false
            }
          },
        ],
      }
    ];
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
    this.updateLabels();
  }

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PAID').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.RETURNED').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PENDING').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SENT').subscribe((label:any) => {
      this.fields[2].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.NOTPAID').subscribe((label:any) => {
      this.fields[3].fieldGroup[0].props.label = label;
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
