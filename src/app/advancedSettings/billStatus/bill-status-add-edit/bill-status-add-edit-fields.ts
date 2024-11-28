import { TranslateService } from "@ngx-translate/core";
import { createCheckboxField, createInputField, createRow } from "../../../share/common/UI/createFields/createField";

export function generateFieldsBillStatus(translate: TranslateService): any[] {
  return [
    createRow([createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true)]),
    createRow(
      [
        createCheckboxField('isPaid', 'FORM.FIELDS.PAID',2),
        createCheckboxField('isReturned', 'FORM.FIELDS.RETURNED',2)
      ]
    ),
    createRow(
      [
        createCheckboxField('isPending', 'FORM.FIELDS.PENDING',2),
        createCheckboxField('isSent', 'FORM.FIELDS.SENT',2),
      ]
    ),
    createRow(
      [
        createCheckboxField('isUnPaid', 'FORM.FIELDS.NOTPAID',1)
      ]
    )
  ];
}




