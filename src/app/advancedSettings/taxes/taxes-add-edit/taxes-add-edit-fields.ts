import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsTaxes(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'title', 'FORM.FIELDS.TITLE', true)]),
    createRow([createInputField(translate,'value', 'FORM.FIELDS.VALUE', true)]),
    createRow([
      createInputField(translate,'equivalentSurcharge', 'FORM.FIELDS.EQUIVALENTSURCHARGE', true,2),
      createRow([createCheckboxField(translate,'isIGIC', 'FORM.FIELDS.ISIGIC',2)])
    ])
  ]
}




