import { TranslateService } from "@ngx-translate/core";

export function getLabelsPrIncidentsUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.ORDER').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.PERIODICITY').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label:any) => {
    fields[2].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.REPORT').subscribe((label:any) => {
    fields[3].fieldGroup[0].props.label = label;
  });
}
