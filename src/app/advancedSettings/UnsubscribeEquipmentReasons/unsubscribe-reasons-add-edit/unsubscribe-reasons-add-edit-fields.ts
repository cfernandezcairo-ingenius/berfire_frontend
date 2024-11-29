import { TranslateService } from "@ngx-translate/core";
import { createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsUnsubscribeReasons(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([createInputField(translate,'description', 'FORM.FIELDS.DESCRIPTION', true)]),
  ]
}




