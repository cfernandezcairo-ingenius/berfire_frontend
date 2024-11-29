import { TranslateService } from "@ngx-translate/core";

export function getLabelsUpdateContractsTypesUpdate(translate: TranslateService, fields: any) {
  translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
    fields[0].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.DURATION').subscribe((label: any) => {
    fields[1].fieldGroup[0].props.label = label;
  });
  translate.get('FORM.FIELDS.ISWARNING').subscribe((label: any) => {
    fields[1].fieldGroup[1].props.label = label;
  });
}
