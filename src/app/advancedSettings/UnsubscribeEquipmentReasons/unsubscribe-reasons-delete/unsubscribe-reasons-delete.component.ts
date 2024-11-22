import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { StyleManager } from '../../../share/services/style-manager.service';
import { UnsubscribeReasonsService } from '../unsubscribe-reasons.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-unsubscribe-reasons-delete',
  standalone: true,
  imports: [],
  templateUrl: './unsubscribe-reasons-delete.component.html',
  styleUrl: './unsubscribe-reasons-delete.component.scss'
})
export class UnsubscribeReasonsDeleteComponent implements OnInit {

  id: any;
  darkMode = false;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private darkModeService: StyleManager,
    private unsubscribeReasonsSrv: UnsubscribeReasonsService,
    private navigationSrv: NavigationService,
    private matSnackBar: MatSnackBar
  ) {
    this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.id = JSON.parse(params['id']);
    });
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  ngOnInit(): void {
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
        this.unsubscribeReasonsSrv.delete(id).subscribe({
          next: (d) => {
            openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'Registro Eliminado con éxito.!!' : 'Data deleted succesfully!!');
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
