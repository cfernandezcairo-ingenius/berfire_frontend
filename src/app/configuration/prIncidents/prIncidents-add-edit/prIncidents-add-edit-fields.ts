import { TranslateService } from "@ngx-translate/core";
import { createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsPrIncidents(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'order', 'FORM.FIELDS.ORDER', true)]),
    createRow([createInputField(translate,'periodicity', 'FORM.FIELDS.PERIODICITY', true)]),
    createRow([createInputField(translate,'description', 'FORM.FIELDS.DESCRIPTION', true)]),
    createRow([createInputField(translate,'report', 'FORM.FIELDS.REPORT', true)])
  ]
}




