import { TranslateService } from "@ngx-translate/core";

export function getFieldsClients(translate: TranslateService) {

 return [
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
            required: translate.get('FORM.VALIDATION.REQUIRED'),
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
