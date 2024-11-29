import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createInputFieldNumber, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsPvPRates(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([createInputField(translate,'description', 'FORM.FIELDS.DESCRIPTION', true)])
  ]
}




