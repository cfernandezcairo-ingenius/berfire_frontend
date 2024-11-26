import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { DocumentsTemplatesService } from '../documents-templates.service';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';

@Component({
  selector: 'app-documents-templates-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class DocumentsTemplatesDeleteComponent extends BaseDeleteComponent {

  documentsTemplatesSrv:any;

  constructor() {super(); }

  override ngOnInit(): void {
    this.documentsTemplatesSrv = this.baseSrv as DocumentsTemplatesService;
    this.id = this.documentsTemplatesSrv._idToDelete;
    this.delete(this.id);
  }

  override delete(id: number) {
    Swal.fire({
      title: this.translate.instant('confirm'),
      text: this.translate.instant('continue'),
      icon: 'question',
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: this.translate.instant('accept'),
      cancelButtonText: this.translate.instant('cancel'),
    }).then(result => {
      if (result.isConfirmed) {
        this.documentsTemplatesSrv.delete(id).subscribe({
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
