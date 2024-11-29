import { TranslateService } from "@ngx-translate/core";
import { createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsBanks(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([createInputField(translate, 'swift', 'FORM.FIELDS.SWIFT', true, 2), createInputField(translate, 'iban', 'FORM.FIELDS.IBAN', true,2)]),
  ];
}
