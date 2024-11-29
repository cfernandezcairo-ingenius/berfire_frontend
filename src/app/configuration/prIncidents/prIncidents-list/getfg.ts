import { FormBuilder } from "@angular/forms";

export function getfgPrIncidents(fb:FormBuilder) {
  return fb.group({
    name:[''],
    teamName:[''],
    teamTitle: [''],
    description: [''],
  });
}
