import { TranslateService } from "@ngx-translate/core";

export function getLabelsUpdatePVPRatesUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.CODE').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
}
