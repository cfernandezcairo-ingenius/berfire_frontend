import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsPopulations(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([
      createInputField(translate,'country','FORM.FIELDS.COUNTRY', true,2),
      createInputField(translate, 'province', 'FORM.FIELDS.PROVINCE', true,2)
    ]),
    createRow([createCheckboxField(translate,'active', 'FORM.FIELDS.ACTIVE')])
  ]
}




