import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { BanksService } from '../banks.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '../../../share/common/UI/utils';

@Component({
  selector: 'app-banks-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers:[TranslateService]
})
export class BanksDeleteComponent implements OnInit {

  id: any;
  darkMode = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly banksSrv: BanksService,
    private readonly navigationSrv: NavigationService,
    private readonly matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.id = this.banksSrv._idToDelete;
    this.delete(this.id);
  }

  delete(id: number) {
    Swal.fire({
      title: this.translate.instant('confirm'),
      text: this.translate.currentLang === 'es' ? 'Desea continuar?' : 'Do you want to continue',
      icon: 'question',
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
      cancelButtonText: this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel',
      background: this.darkMode ? '#444' : '#fff',
      color: this.darkMode ? '#fff' : '#000',
    }).then(result => {
      if (result.isConfirmed) {
        this.banksSrv.delete(id).subscribe({
          next: (d) => {
            openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'Registro Eliminado con éxito.!!' : 'Data deleted succesfully!!', this.translate.currentLang)
            this.navigationSrv.goback();
          },
          error: (error) => {
            Swal.fire({
              title: this.translate.instant('inform'),
              text: this.translate.currentLang === 'es' ? 'Error al delete el Registro.!!!' : 'Error deleting data!!',
              icon: 'error',
              showConfirmButton:true,
              showCancelButton: false,
              confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
              background: this.darkMode ? '#444' : '#fff',
              color: this.darkMode ? '#fff' : '#000',
            });
          },
          complete: () => {

          }

        });
      } else {
        return;
      }
    });
  }
}
