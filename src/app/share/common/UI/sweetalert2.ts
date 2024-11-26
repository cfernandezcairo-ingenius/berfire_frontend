import Swal, { SweetAlertIcon } from 'sweetalert2';

export function showMessage(title:string, text:string, icon:SweetAlertIcon, showConfirmButton: boolean, showCancelButton:boolean, confirmButtonText:string, cancelButtonText: string) {

  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showConfirmButton:showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText
  });
}
