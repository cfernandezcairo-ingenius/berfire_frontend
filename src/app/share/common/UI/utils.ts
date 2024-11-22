
import {MatSnackBar} from '@angular/material/snack-bar';

export function openSnackBar(_snackBar: MatSnackBar, message: string) {
  _snackBar.open(message, '', {
    duration: 2000
  });
}
