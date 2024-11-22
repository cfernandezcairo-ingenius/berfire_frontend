
import {MatSnackBar} from '@angular/material/snack-bar';

export function openSnackBar(_snackBar: MatSnackBar, message: string, lang:string = '') {

  _snackBar.open(message, lang === 'es' ? 'Cerrar' : 'Close', {
    duration: 2000
  });
}
