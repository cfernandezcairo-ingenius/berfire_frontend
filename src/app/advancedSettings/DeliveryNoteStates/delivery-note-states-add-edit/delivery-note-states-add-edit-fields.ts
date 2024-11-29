import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsDeliveryNoteStates(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([
      createCheckboxField('confirmDeliveryNote', 'FORM.FIELDS.CONFIRM')])
  ];
}




