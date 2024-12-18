import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { PopulationsService } from '../populations.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { catchError, combineLatest} from 'rxjs';

export interface ICountry {
  country_name_en: string,
  country_name_es?: string,
  country_short_name:string
}

@Component({
  selector: 'app-populations-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './populations-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class PopulationsAddEditComponent extends BaseAddEditComponent {

  countries: ICountry[] = [];
  selectedCountry = '';

  override dataModifiedInNewTab = 'dataModifiedInNewTabPopulations';

  constructor(
    private readonly populationsService: PopulationsService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,populationsService,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.showinNewTab = this.router.url.includes('/populations/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'input',
            key: 'name',
            props: {
              required: true,
              label: 'FORM.FIELDS.FIRSTNAME',
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              },
            },
          }
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'select',
            key: 'country',
            props: {
              label: 'FORM.FIELDS.COUNTRY',
              required:true,
              options: [
                { label: 'Opción 1', value: '1' },
                { label: 'Opción 2', value: '2' },
                { label: 'Opción 3', value: '3' },
              ],
              change: (field:any, $event:any) => this.onSelectChange(field, $event),
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              },
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'select',
            key: 'province',
            props: {
              label: 'FORM.FIELDS.PROVINCE',
              options: [],
              required:true
            },
            validators: {
              validation: ['required'],
            },
            validation: {
              messages: {
                required: this.translate.get('FORM.VALIDATION.REQUIRED'),
              },
            }
          }
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'active',
            props: {
              label: 'FORM.FIELDS.ACTIVE',
              required:false
            },
          },
        ],
      },
    ];
  }

  translateLabel(fg: any) {
    this.translate.get(fg.props.label).subscribe((translatedLabel: string) => {
      fg.props.label = translatedLabel;
    });
  }

  handleRequiredField(fg: any) {
    this.translate.onLangChange.subscribe(() => {
      fg.validation.messages.required = this.translate.get('FORM.VALIDATION.REQUIRED');
      this.updateLabelOnLangChange(fg);
    });
  }

  updateLabelOnLangChange(fg: any) {
    this.translate.get(fg.props.label).subscribe({
      next: (updatedLabel: string) => {
        fg.props.label = updatedLabel;
      }
    });
  }

  override ngOnInit(): void {
    this.fields.forEach((f: any) => {
      f.fieldGroup.forEach((fg: any) => {
        this.translateLabel(fg);
        if (fg.props.required) {
          this.handleRequiredField(fg);
        }
      });
    });

    let getId = this.getIdToEdit();
    this.id = getId.id;
    this.showinNewTab = getId.newTab;
    if (this.id === 0) {
      //Agregar
      if (this.id === 0 && !this.showinNewTab) {
        this.shoWButtonSaveAndNew = true;
      } else {
        this.shoWButtonSaveAndNew = false
      }
      this.model = {
        active: false,
      }
    } else {
      //edit
      let payload = {
        id: this.id
      }
      this.loading = true;
      const obsCountries = this.populationsService.getCountries().pipe(
        catchError((error) => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar los Paises.!!!' : 'Error getting data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept';
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel';
          showMessage(title, text, 'error', true, false, confirmButtonText, cancelButtonText);
          return [];
        })
      );

      const obsData = this.populationsService.getById(payload).pipe(
        catchError((error) => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar el Registro.!!!' : 'Error getting data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept';
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel';
          showMessage(title, text, 'error', true, false, confirmButtonText, cancelButtonText);
          return [];
        })
      );

      combineLatest([obsCountries, obsData]).subscribe({
        next: ([countries, data]) => {
          this.countries = countries.data;
          this.model = { ...data.data };
          this.selectedCountry = this.model.country;
          this.updateOptionsProvinces();
        },
        complete: () => {
          this.loading = false;
        }
      });
      this.shoWButtonSaveAndNew = false;
    }
    this.updateOptionsCountries();
  }

  onSelectChange(field:any, event:any) {
    this.selectedCountry = event.value;
    this.updateOptionsProvinces();
  }

  updateOptionsCountries() {
    this.loading = true;
    this.populationsService.getCountries().subscribe((countries:any) => {
      this.loading = false;
      this.countries = countries.data;
      this.fields.map((field:any) => {
          const selectField = field.fieldGroup.find((field: { key: string; }) => field.key === 'country');
          if (selectField) {
            selectField.props.options = this.countries.map((option: any) => ({
              label: this.translate.currentLang === 'es' ? option.country_name_es : option.country_name_en,
              value:  option.country_name_en
            }));
          }
      });

    });
  }

  updateOptionsProvinces() {
    this.loading = true;
    this.populationsService.getProvinces(this.selectedCountry).subscribe((provinces:any) => {
      this.loading = false;
      this.fields.map((field:any) => {
          const selectField = field.fieldGroup.find((field: { key: string; }) => field.key === 'province');
          if (selectField) {
            selectField.props.options = provinces.data.map((option: any) => ({
              label: option.state_name,
              value: option.state_name
            }));
          }
      });

    });
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        country: this.fg.get('country')?.value,
        province: this.fg.get('province')?.value,
        active: this.fg.get('active')?.value === undefined ? false : this.fg.get('active')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        country: this.fg.get('country')?.value,
        province: this.fg.get('province')?.value,
        active: this.fg.get('active')?.value,
      }
    }
    super.onSubmitBase(payload, nuevo);
  }

  onCancel() {
    super.onCancelBase();
  }
}
