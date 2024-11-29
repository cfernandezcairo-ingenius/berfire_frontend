import { TranslateService } from "@ngx-translate/core";
import { createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsPrTypes(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow([
      createInputField(translate,'teamName', 'FORM.FIELDS.TEAMNAME', true,2),
      createInputField(translate,'teamTitle', 'FORM.FIELDS.TEAMTITLE', true,2)])
  ]
}




