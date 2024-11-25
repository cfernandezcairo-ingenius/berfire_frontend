import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { StyleManager } from '../../../share/services/style-manager.service';
import { DocumentsTemplatesService } from '../documents-templates.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-documents-templates-delete',
  standalone: true,
  imports: [],
  templateUrl: './documents-templates-delete.component.html',
  styleUrl: './documents-templates-delete.component.scss',
  providers: [TranslateService]
})
export class DocumentsTemplatesDeleteComponent implements OnInit {

  id: any;
  darkMode = false;

  constructor(
    private readonly translate: TranslateService,
    private readonly darkModeService: StyleManager,
    private readonly documentsTemplatesSrv: DocumentsTemplatesService,
    private readonly navigationSrv: NavigationService,
    private readonly matSnackBar: MatSnackBar
  ) {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  ngOnInit(): void {
    this.id = this.documentsTemplatesSrv._idToDelete;
    this.delete(this.id);
  }

  delete(id: number) {
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
          next: (d) => {
            openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'Registro Eliminado con éxito.!!' : 'Data deleted succesfully!!', this.translate.currentLang);
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
