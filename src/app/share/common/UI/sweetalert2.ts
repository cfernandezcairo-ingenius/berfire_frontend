import Swal, { SweetAlertIcon } from 'sweetalert2';

export function showMessage(title:string, text:string, icon:SweetAlertIcon, showConfirmButton: boolean, showCancelButton:boolean, confirmButtonText:string) {

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton:showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    //background: this.darkMode ? '#444' : '#fff',
    //color: this.darkMode ? '#fff' : '#000',
  });
}
