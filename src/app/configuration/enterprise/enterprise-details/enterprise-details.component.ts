import { Component } from '@angular/core';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { generateFieldsEnterpriseDetails } from './enterprise-details-fields';
import { EnterpriseDetailsService } from './enterprise.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormlyBaseComponent } from "../../../share/common/UI/formly-form/formly-base.component";
import { catchError, combineLatest } from 'rxjs';

@Component({
  selector: 'app-enterprise-details',
  standalone: true,
  imports: [SpinnerComponent, CommonModule, TranslateModule, FormlyBaseComponent],
  templateUrl: './enterprise-details.component.html',
  styleUrl: './enterprise-details.component.scss'
})
export class EnterpriseDetailsComponent extends BaseAddEditComponent {

  populations: any;

    constructor(private readonly enterpriseDetailsSrv: EnterpriseDetailsService,
      public override  readonly translate: TranslateService,
      public override readonly matSnackBar: MatSnackBar,
      public override readonly navigationSrv: NavigationService,) {
      super(translate,navigationSrv,enterpriseDetailsSrv,matSnackBar);
      this.fields = generateFieldsEnterpriseDetails(translate);
    }

    override ngOnInit(): void {
      this.loading = true;
      const obsPopulations = this.enterpriseDetailsSrv.getPopulations().pipe(
        catchError((error) => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar las poblaciones.!!!' : 'Error getting  populations data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept';
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel';
          showMessage(title, text, 'error', true, false, confirmButtonText, cancelButtonText);
          return [];
        })
      );
      const obsEnterprise = this.enterpriseDetailsSrv.getAll().pipe(
        catchError((error) => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar los datos de la Empresa.!!!' : 'Error getting Enterprise data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept';
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel';
          showMessage(title, text, 'error', true, false, confirmButtonText, cancelButtonText);
          return [];
        })
      );
      combineLatest([obsPopulations, obsEnterprise]).subscribe({
        next: ([populations, data]) => {
          this.populations = populations.data;
          this.model = { ...data.data };
        },
        complete: () => {
          this.loading = false;
        }
      });
    }

    onSubmit(model:any, nuevo:boolean = false) {
      let payload = {};
      if (this.id === 0) {
        payload = {
          cif: this.fg.get('cif')?.value,
          name: this.fg.get('name')?.value,
          fiscalName: this.fg.get('fiscalName')?.value,
          address: this.fg.get('address')?.value,
          population: this.fg.get('population')?.value,
          code: this.fg.get('code')?.value
        }
      } else {
        payload = {
          id: this.id,
          name: this.fg.get('name')?.value,
          templateType: this.fg.get('templateType')?.value,
          renderType: this.fg.get('renderType')?.value,
          predetermined: this.fg.get('predetermined')?.value === undefined ? false : this.fg.get('predetermined')?.value,
          description: this.fg.get('description')?.value,
          template: this.fg.get('template')?.value
        }
      }
      super.onSubmitBase(payload);
    }

    onCancel() {
      super.onCancelBase();
    }
}
