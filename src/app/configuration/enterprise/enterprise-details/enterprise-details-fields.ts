import { TranslateService } from "@ngx-translate/core";
import { createInputField, createRow, createSelectField } from "../../../share/common/UI/createFields/createField";

export function generateFieldsEnterpriseDetails(translate: TranslateService): any[] {
  return [
    createRow([
      createInputField(translate,'name', 'FORM.FIELDS.FIRSTNAME', true, 3),
      createInputField(translate,'nifCif', 'FORM.FIELDS.NIFCIF', true, 3),
      createInputField(translate,'fiscalName', 'FORM.FIELDS.FISCALNAME', true, 3),
    ]),
    createRow([
      createInputField(translate,'fiscalAddress', 'FORM.FIELDS.FISCALADDRESS', true, 3),
      createSelectField(translate,'fiscalPopulation', 'FORM.FIELDS.FISCALPOPULATION', true, 3),
      createInputField(translate,'fiscalPostalCode', 'FORM.FIELDS.FISCALPOSTALCODE', true, 3),
    ]),
    createRow([
      createInputField(translate,'email', 'FORM.FIELDS.EMAIL', true, 3),
      createInputField(translate,'mainPhone', 'FORM.FIELDS.MAINPHONE', false, 3),
      createInputField(translate,'secondaryPhone', 'FORM.FIELDS.SECONDARYPHONE', false, 3),
    ]),
    createRow([
      createInputField(translate,'fax', 'FORM.FIELDS.FAX', false, 3),
      createInputField(translate,'webPage', 'FORM.FIELDS.WEBPAGE', false, 3),
      createInputField(translate,'engineerByDefault', 'FORM.FIELDS.DEFAULTING', true, 3),
    ]),
    createRow([createInputField(translate,'iban', 'FORM.FIELDS.IBAN', false)]),
  ]
}




