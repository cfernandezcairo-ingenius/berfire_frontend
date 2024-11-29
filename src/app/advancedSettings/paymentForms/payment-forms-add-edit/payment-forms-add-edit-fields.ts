import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createInputFieldNumber, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsPaymentForms(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([createInputFieldNumber(translate,'days','FORM.FIELDS.DAYS', true)]),
    createRow([createCheckboxField(translate,'home', 'FORM.FIELDS.HOME')])
  ]
}




