import { TranslateService } from "@ngx-translate/core";

export function getLabelsManufacturersUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.ISACTIVE').subscribe((label:any) => {
    fields[2].fieldGroup[0].props.label = label;
  });
}
