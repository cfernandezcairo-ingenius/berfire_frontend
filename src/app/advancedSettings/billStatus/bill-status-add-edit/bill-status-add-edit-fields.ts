import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsBillStatus(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow(
      [
        createCheckboxField(translate,'isPaid', 'FORM.FIELDS.PAID',2),
        createCheckboxField(translate,'isReturned', 'FORM.FIELDS.RETURNED',2)
      ]
    ),
    createRow(
      [
        createCheckboxField(translate,'isPending', 'FORM.FIELDS.PENDING',2),
        createCheckboxField(translate,'isSent', 'FORM.FIELDS.SENT',2),
      ]
    ),
    createRow(
      [
        createCheckboxField(translate,'isUnPaid', 'FORM.FIELDS.NOTPAID',1)
      ]
    )
  ];
}




