import { TranslateService } from "@ngx-translate/core";

export function createInputField(translate: TranslateService, key: string, labelKey: string, required: boolean = false): any {
  return {
    className: 'col-sm-12 col-md-12 col-lg-12',
    type: 'input',
    key: key,
    props: {
      required: required,
      label: labelKey,
    },
    validators: required
      ? { validation: ['required'] }
      : undefined,
    validation: required
      ? {
          messages: {
            required: translate.get('FORM.VALIDATION.REQUIRED'),
          },
        }
      : undefined,
  };
}

export function createCheckboxField(key: string, labelKey: string, colSize: string = 'col-sm-12 col-md-6 col-lg-6'): any {
  return {
    className: colSize,
    type: 'checkbox',
    key: key,
    props: {
      label: labelKey,
      required: false,
    },
  };
}

export function createRow(fields: any[]): any {
  return {
    fieldGroupClassName: 'row',
    fieldGroup: fields,
  };
}
