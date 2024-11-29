import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsDocumentsTemplates(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([createInputField(translate,'templateType', 'FORM.FIELDS.TEMPLATETYPE', true)]),
    createRow([createInputField(translate,'renderType', 'FORM.FIELDS.RENDERTYPE', true)]),
    createRow([createCheckboxField(translate,'predetermined', 'FORM.FIELDS.PREDETERMINED')]),
    createRow([createInputField(translate,'description', 'FORM.FIELDS.DESCRIPTION', true)]),
  ]
}




