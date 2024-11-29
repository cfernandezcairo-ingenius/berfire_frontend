import { TranslateService } from "@ngx-translate/core";

export function getLabelsUpdateBanks(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.TEAMNAME').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.TEAMTITLE').subscribe((label: any) => {
    fields[1].fieldGroup[1].props.label = label;
  });
  translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label: any) => {
    fields[2].fieldGroup[0].props.label = label;
  });
}
