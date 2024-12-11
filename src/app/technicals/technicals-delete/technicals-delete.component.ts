import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { TechnicalsService } from '../technicals.service';
import { NavigationService } from '../../navigation/shared/services/navigation.service';
import { openSnackBar } from '../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-technicals-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class TechnicalsDeleteComponent implements OnInit {

  id: any;

  constructor(
    private readonly translate: TranslateService,
    private readonly technicalsSrv: TechnicalsService,
    private readonly navigationSrv: NavigationService,
    private readonly matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.id = this.technicalsSrv._idToDelete;
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
    }).then(result => {
      if (result.isConfirmed) {
        this.technicalsSrv.delete(id).subscribe({
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
