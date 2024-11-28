import { TranslateService } from "@ngx-translate/core";

export function createInputField(translate: TranslateService, key: string, labelKey: string, required: boolean = false, columns: number = 1): any {
  return {
    className: getLayout(columns),
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

function getLayout(columns: number): string {
  let result = '';

  switch(columns) {
    case 1 :
      result = 'col-sm-12 col-md-12 col-lg-12';
      break;
    case 2 :
      result = 'col-sm-12 col-md-6 col-lg-6';
      break;
    case 3 :
      result = 'col-sm-12 col-md-4 col-lg-4';
      break;
    case 4 :
      result = 'col-sm-12 col-md-3 col-lg-3';
      break;
    case 6 :
      result = 'col-sm-12 col-md-2 col-lg-2';
      break;
    default:
      result = 'col-sm-12 col-md-12 col-lg-12';
      break;
  }
  return result;
}

export function createCheckboxField(key: string, labelKey: string, columns: number = 1): any {
  return {
    className: getLayout(columns),
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
