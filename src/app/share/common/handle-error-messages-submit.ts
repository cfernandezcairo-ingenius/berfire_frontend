import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

export function HandleMessagesSubmit(translate: TranslateService, error: any) {

  let titleError = '';
  if (error.error.error[0].constraints.IsUniqueValidator) {
    titleError = translate.instant('error.messages.IsUniqueValidator') + " " + translate.instant('FORM.FIELDS.VALUE') + " : '" + error.error.error[0].value + "'"
} else if (error.error.error[0].constraints.isInt) {
    titleError = translate.instant('error.messages.IsInt') + " " + translate.instant('FORM.FIELDS.FIELD') + " : '" + translate.instant('FORM.FIELDS.' + error.error.error[0].property.toString().toUpperCase()) + "'"
}
Swal.fire({
  title: translate.instant('inform'),
  text: titleError,
  icon: 'error',
  showConfirmButton:true,
  confirmButtonText: 'OK',
  //background: this.darkMode ? '#444' : '#fff',
  //color: this.darkMode ? '#fff' : '#000',
        })
//return titleError;
}
