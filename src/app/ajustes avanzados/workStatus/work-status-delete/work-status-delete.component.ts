import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { StyleManager } from '../../../share/services/style-manager.service';
import { WorkStatusService } from '../work-status.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-request-status-delete',
  standalone: true,
  imports: [],
  templateUrl: './work-status-delete.component.html',
  styleUrl: './work-status-delete.component.scss'
})
export class WorkStatusDeleteComponent implements OnInit {

  id: any;
  darkMode = false;

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService,
    private darkModeService: StyleManager,
    private workStatusSrv: WorkStatusService,
    private navigationSrv: NavigationService
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
        this.workStatusSrv.delete(id).subscribe({
          next: (d) => {
            Swal.fire({
              title: this.translate.instant('inform'),
              text: this.translate.currentLang === 'es' ? 'Registro Eliminado con éxito.!!' : 'Data deleted succesfully!!',
              icon: 'success',
              showConfirmButton:true,
              showCancelButton: false,
              confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
              cancelButtonText: this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel',
              background: this.darkMode ? '#444' : '#fff',
              color: this.darkMode ? '#fff' : '#000',
            });
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
