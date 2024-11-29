import { FormBuilder } from "@angular/forms";

export function getfgPrTypes(fb:FormBuilder) {
  return fb.group({
    name:[''],
    teamName:[''],
    teamTitle: [''],
    description: [''],
  });
}
