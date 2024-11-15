import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

export function HandleMessagesSubmit(translate: TranslateService, error: any) {
  let titleError = '';
  if (error.error.message) {
    titleError = error.error.message;
    showErrorMessage(translate, titleError);
    return;
  }
  if (error.error.error && error.error.error.lenght > 0 ) {
    error.error.error.forEach((e:any) => {
      if (e.constraints.IsUniqueValidator) {
        if (titleError === '') {
          titleError = translate.instant('error.messages.IsUniqueValidator') + " " + translate.instant('FORM.FIELDS.VALUE') + " : '" + e.value + "'";
        }
        else {
          titleError = titleError + ' , ' + translate.instant('error.messages.IsUniqueValidator') + " " + translate.instant('FORM.FIELDS.VALUE') + " : '" + e.value + "'" ;
        }
      } else if (e.constraints.isInt) {
        if (titleError === '') {
            titleError = translate.instant('error.messages.IsInt') + " " + translate.instant('FORM.FIELDS.FIELD') + " : '" + translate.instant('FORM.FIELDS.' + e.property.toString().toUpperCase()) + "'";
        } else {
          titleError =  titleError + ' , ' +translate.instant('error.messages.IsInt') + " " + translate.instant('FORM.FIELDS.FIELD') + " : '" + translate.instant('FORM.FIELDS.' + e.property.toString().toUpperCase()) + "'";
        }
      } else if (e.constraints.maxLength) {
        if (titleError === '') {
          titleError = translate.instant('error.messages.maxLength') + " " + translate.instant('FORM.FIELDS.FIELD') + " : '" + translate.instant('FORM.FIELDS.' + e.property.toString().toUpperCase()) + "'"
        } else {
            titleError = titleError + ' , ' +translate.instant('error.messages.maxLength') + " " + translate.instant('FORM.FIELDS.FIELD') + " : '" + translate.instant('FORM.FIELDS.' + e.property.toString().toUpperCase()) + "'"
        }
      }
      showErrorMessage(translate, titleError);
    });
}
}

function showErrorMessage(translate: TranslateService,titleError: string) {
  Swal.fire({
    title: translate.instant('inform'),
    text: titleError,
    icon: 'error',
    showConfirmButton:true,
    confirmButtonText: 'OK',
    //background: this.darkMode ? '#444' : '#fff',
    //color: this.darkMode ? '#fff' : '#000',
  })
}
