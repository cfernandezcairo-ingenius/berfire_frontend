import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createInputFieldNumber, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsContractsTypes(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([
      createInputFieldNumber(translate,'duration', 'FORM.FIELDS.DURATION', true,2),
      createCheckboxField('isWarning', 'FORM.FIELDS.ISWARNING',2)])
  ];
}




