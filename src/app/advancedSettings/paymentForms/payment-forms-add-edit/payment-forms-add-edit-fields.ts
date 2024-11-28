import { TranslateService } from "@ngx-translate/core";

export function getFieldsPaymentForms(translate: TranslateService) {
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
          key: 'days',
          props: {
            label: 'FORM.FIELDS.DAYS',
            type: 'number',
            step: 1,
            required: true,
            min: 0,
            max: 999,
          },
          validators: {
            validation: ['required', 'number'],
          },
          validation: {
            messages: {
              number: translate.get('FORM.VALIDATION.NUMBER'),
              required: translate.get('FORM.VALIDATION.REQUIRED'),
            }
          },
        },
        {
          className: 'col-sm-12 col-md-6 col-lg-6',
          type: 'checkbox',
          key: 'home',
          props: {
            label: 'FORM.FIELDS.HOME',
            required:false
          },
        },
      ],
    },
  ];
}
