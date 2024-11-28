import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';
import { NavigationService } from '../navigation/shared/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { openSnackBar } from '../share/common/UI/utils';

@Component({
  selector: 'app-prTypes-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: []
})
export class BaseDeleteComponent implements OnInit {

  id:number = 0;

  constructor(
    public readonly baseSrv: BaseService,
    public readonly translate: TranslateService,
    public readonly navigationSrv: NavigationService,
    public readonly matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log('Metodo onInit');
  }

  deleteBase(id: number) {
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
        this.baseSrv.delete(id).subscribe({
          next: (d:any) => {
            openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'Registro Eliminado con éxito.!!' : 'Data deleted succesfully!!', this.translate.currentLang)
            this.navigationSrv.goback();
          },
          error: (error:any) => {
            Swal.fire({
              title: this.translate.instant('inform'),
              text: this.translate.currentLang === 'es' ? 'Error al eliminar el Registro.!!!' : 'Error deleting data!!',
              icon: 'error',
              showConfirmButton:true,
              showCancelButton: false,
              confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
            });
          },
        });
      } else {
        return;
      }
    });
  }
}
