import { Component, ViewEncapsulation } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { DocumentsTemplatesService } from '../documents-templates.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-documents-templates-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './documents-templates-add-edit.component.html',
  styleUrl: './documents-templates-add-edit.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService, TranslateStore]
})
export class DocumentsTemplatesAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabTemplates';

    constructor(
      private readonly documentsTemplatesSrv: DocumentsTemplatesService,
      public override  readonly translate: TranslateService,
      public override readonly matSnackBar: MatSnackBar,
      public override readonly navigationSrv: NavigationService,
      public readonly router: Router
    ) {
    super(translate, navigationSrv,documentsTemplatesSrv,matSnackBar);
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
          },
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'templateType',
            props: {
              required: true,
              label: 'FORM.FIELDS.TEMPLATETYPE',
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
            key: 'renderType',
            props: {
              label: 'FORM.FIELDS.RENDERTYPE',
              required: true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'predetermined',
            props: {
              label: 'FORM.FIELDS.PREDETERMINED',
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
            type: 'input',
            key: 'description',
            props: {
              label: 'FORM.FIELDS.DESCRIPTION',
              required: true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'input',
            key: 'template',
            props: {
              label: 'FORM.FIELDS.TEMPLATE',
              required: true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              }
            },
          },
        ],
      },
    ];
  }

  override ngOnInit(): void {
    this.id = this.documentsTemplatesSrv._idToEdit;
    if (this.id === 0) {
      this.model = {
        predetermined: false,
      }
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
    this.translate.get('FORM.FIELDS.TEMPLATETYPE').subscribe((label:any) => {
      this.fields[0].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.RENDERTYPE').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PREDETERMINED').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEMPLATE').subscribe((label:any) => {
      this.fields[3].fieldGroup[0].props.label = label;
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
        templateType: this.fg.get('templateType')?.value,
        renderType: this.fg.get('renderType')?.value,
        predetermined: this.fg.get('predetermined')?.value === undefined ? false : this.fg.get('predetermined')?.value,
        description: this.fg.get('description')?.value,
        template: this.fg.get('template')?.value
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        templateType: this.fg.get('templateType')?.value,
        renderType: this.fg.get('renderType')?.value,
        predetermined: this.fg.get('predetermined')?.value === undefined ? false : this.fg.get('predetermined')?.value,
        description: this.fg.get('description')?.value,
        template: this.fg.get('template')?.value
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase();
  }
}
