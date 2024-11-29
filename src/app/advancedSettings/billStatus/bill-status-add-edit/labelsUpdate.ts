import { TranslateService } from "@ngx-translate/core";

export function getLabelsUpdateBillUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.PAID').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.RETURNED').subscribe((label: any) => {
    fields[1].fieldGroup[1].props.label = label;
  });
  translate.get('FORM.FIELDS.PENDING').subscribe((label: any) => {
    fields[2].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.SENT').subscribe((label: any) => {
    fields[2].fieldGroup[1].props.label = label;
  });
}
