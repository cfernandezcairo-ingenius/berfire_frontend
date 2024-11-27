import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { PopulationsService } from '../populations.service';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
@Component({
  selector: 'app-populations-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class PopulationsDeleteComponent extends BaseDeleteComponent {

  populationsSrv:any;

  constructor() {super();}

  override ngOnInit(): void {
    this.populationsSrv = this.baseSrv as PopulationsService;
    this.id = this.populationsSrv._idToDelete;
    this.delete(this.id);
  }

  override delete(id: number) {
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
        this.populationsSrv.delete(id).subscribe({
          next: (d:any) => {
            openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'Registro Eliminado con éxito.!!' : 'Data deleted succesfully!!', this.translate.currentLang);
            this.navigationSrv.goback();
          },
          error: (error:any) => {
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
