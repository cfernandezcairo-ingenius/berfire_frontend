import { TranslateService } from "@ngx-translate/core";

export function getFieldsBillStatus(translate: TranslateService) {

  return [
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
