import { TranslateService } from "@ngx-translate/core";

export function createInputField(translate: TranslateService, key: string, labelKey: string, required: boolean = false, columns: number = 1): any {
  const inputFieldString =  {
    className: getLayout(columns),
    type: 'input',
    key: key,
    props: {
      required: required,
      label: '',
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
  translate.get(labelKey).subscribe((translatedLabel: string) => {
    inputFieldString.props.label = translatedLabel;
  });
  if (required) {
    translate.onLangChange.subscribe(() => {
      inputFieldString.validation!.messages.required = translate.get('FORM.VALIDATION.REQUIRED');
    });
  }
  return inputFieldString;
};

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

export function createCheckboxField(translate: TranslateService, key: string, labelKey: string, columns: number = 1): any {
  const checkBoxField =  {
    className: getLayout(columns),
    type: 'checkbox',
    key: key,
    props: {
      label: '',
      required: false,
    },
  };
  translate.get(labelKey).subscribe((translatedLabel: string) => {
    checkBoxField.props.label = translatedLabel;
  });
  return checkBoxField;
}

export function createRow(fields:any[]) {
  return {
    fieldGroupClassName: 'row',
    fieldGroup: fields,
  }
}

export function createInputFieldNumber(translate: TranslateService, key: string, labelKey: string, required: boolean = false,step: number = 1,min: number = 0, columns: number = 1): any {
  const inputFieldNumber = {
    className: getLayout(columns),
    type: 'input',
    key: key,
    props: {
      type:'number',
      required: required,
      label: '',
      step: 1,
      min: 0
    },
    validators: required
      ? { validation: ['required', 'number'] }
      : undefined,
    validation: required
      ? {
          messages: {
            required: translate.get('FORM.VALIDATION.REQUIRED'),
            number: translate.get('FORM.VALIDATION.NUMBER')
          },
        }
      : undefined,
  };
  translate.get(labelKey).subscribe((translatedLabel: string) => {
    inputFieldNumber.props.label = translatedLabel;
  });
  if (required) {
    translate.onLangChange.subscribe(() => {
      inputFieldNumber.validation!.messages.required = translate.get('FORM.VALIDATION.REQUIRED');
    });
  }
  return inputFieldNumber;
}
