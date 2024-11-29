import { TranslateService } from "@ngx-translate/core";
import { createInputField, createRow } from "../../share/common/UI/createFields/createField";

export function generateFieldsTechnicals(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([
      createInputField(translate,'firstSurname', 'FORM.FIELDS.FIRSTSURNAME', true,2),
      createInputField(translate,'secondSurName', 'FORM.FIELDS.SECONDSURNAME', true,2)]),
    createRow([createInputField(translate,'user', 'FORM.FIELDS.USER', false)]),
  ]
}




