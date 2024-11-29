import { TranslateService } from "@ngx-translate/core";

export function getLabelsUpdatePopulationsUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.COUNTRY').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.PROVINCE').subscribe((label: any) => {
    fields[1].fieldGroup[1].props.label = label;
  });
  translate.get('FORM.FIELDS.ACTIVE').subscribe((label: any) => {
    fields[2].fieldGroup[0].props.label = label;
  });
}
