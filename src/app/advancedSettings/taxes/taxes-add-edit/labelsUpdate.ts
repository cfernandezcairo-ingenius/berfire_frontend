import { TranslateService } from "@ngx-translate/core";

export function getLabelsaTxesUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.TITLE').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.VALUE').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.EQUIVALENTSURCHARGE').subscribe((label:any) => {
    fields[2].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.ISIGIC').subscribe((label: any) => {
    fields[2].fieldGroup[1].props.label = label;
  });
}
