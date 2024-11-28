import { TranslateService } from "@ngx-translate/core";

export function getFieldsBanks(translate: TranslateService) {

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
        className: 'col-sm-12 col-md-6 col-lg-6',
        type: 'input',
        key: 'swift',
        props: {
          label: 'FORM.FIELDS.SWIFT',
          required:true
        },
        validators: {
          validation: ['required'],
        },
        validation: {
          messages: {
            required: translate.get('FORM.VALIDATION.REQUIRED'),
          },
        },
      },
      {
        className: 'col-sm-12 col-md-6 col-lg-6',
        type: 'input',
        key: 'iban',
        props: {
          label: 'FORM.FIELDS.IBAN',
          required:true
        },
        validators: {
          validation: ['required'],
        },
        validation: {
          messages: {
            required: translate.get('FORM.VALIDATION.REQUIRED'),
          },
        },
      },
    ],
  },
];
}
