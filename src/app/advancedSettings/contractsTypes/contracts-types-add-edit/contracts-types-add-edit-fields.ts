import { TranslateService } from "@ngx-translate/core";

export function getFieldsContractsTypes(translate: TranslateService) {
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
              required: translate.get('FORM.VALIDATION.REQUIRED'),
              number: translate.get('FORM.VALIDATION.NUMBER')
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
              required: translate.get('FORM.VALIDATION.REQUIRED'),
            },
          },
        }
      ],
    }

  ];

}
