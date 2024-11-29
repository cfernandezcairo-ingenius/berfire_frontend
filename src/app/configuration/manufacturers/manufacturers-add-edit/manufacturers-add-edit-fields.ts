import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsManufacturers(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([createInputField(translate,'description', 'FORM.FIELDS.DESCRIPTION', true)]),
    createRow([createCheckboxField(translate,'isActive', 'FORM.FIELDS.ISACTIVE')]),
  ]
}




