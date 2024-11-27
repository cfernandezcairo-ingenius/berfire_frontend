import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd } from '@angular/router';
import { PopulationsService } from '../populations.service';
import { CommonModule } from '@angular/common';
import { HandleMessagesSubmit } from '../../../share/common/handle-error-messages-submit';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { openSnackBar } from '../../../share/common/UI/utils';
import { showMessage } from '../../../share/common/UI/sweetalert2';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';

@Component({
  selector: 'app-populations-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './populations-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class PopulationsAddEditComponent extends BaseAddEditComponent {

  countries: any;
  selectedCountry = '';
  populationsService:any;

  constructor() {
    super();
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/populations/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
  }

  override ngOnInit(): void {
    this.populationsService = this.baseSrv as PopulationsService;
    this.id = this.populationsService._idToEdit;
    if (this.id === 0) {
      //Agregar
      this.shoWButtonSaveAndNew = true;
      this.model = {
        active: false,
      }
    } else {
      //edit
      let payload = {
        id: this.id
      }
      this.loading = true;
      this.populationsService.getById(payload).subscribe({
        next:(res:any) => {
          this.model = { ...res.data};
          this.selectedCountry = res.data.country;
          this.updateOptionsProvinces();
        },
        error: (erro:any) => {
          let title = this.translate.instant('inform');
          let text = this.translate.currentLang === 'es' ? 'Error al cargar el Registro.!!!' : 'Error getting data!!';
          let confirmButtonText = this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept'
          let cancelButtonText = this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel';
          showMessage(title, text,'error',true,false,confirmButtonText, cancelButtonText)
        },
        complete: () => {
          this.loading = false;
        }
      });
      this.shoWButtonSaveAndNew = false;
    }

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
    this.updateLabels();
    this.updateOptionsCountries();
  }

  onSelectChange(field:any, event:any) {
    this.selectedCountry = this.countries.filter((c:any) => c.country_short_name === event.value)[0].country_name_en;
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
              value: option.country_short_name
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

  override updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.COUNTRY').subscribe((label:any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PROVINCE').subscribe((label:any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.ACTIVE').subscribe((label:any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
  }

  override updateValidationMessages() {
    this.fields.forEach((field:any) => {
      if (field.fieldGroup) {
        field.fieldGroup.forEach((fG: any) => {
          if (fG.validation?.messages) {
            fG.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
          }
        });
      } else if (field.validation?.messages) {
          field.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
        }
    });
  }

  override onSubmit(model:any, nuevo:boolean = false) {
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
    let myobs = this.id === 0 ? this.populationsService.add(payload) : this.populationsService.edit(payload);
    myobs.subscribe({
      next: (res:any) => {
        if (res.success === true) {
          openSnackBar(this.matSnackBar,this.translate.instant('save_ok'), this.translate.currentLang);
        } else {
          HandleMessagesSubmit(this.translate, res.error);
        }
        //Aqui tengo que preguntar si nuevo = true
        //Para limpiar el formulario
        //y permanecer en la ventana
        if (this.showinNewTab) {
          localStorage.setItem('dataModifiedInNewTabPopulations', 'true');
          this.showinNewTab = false
          if (!nuevo) window.close();
        } else if (nuevo) {
            this.fg.reset();
          } else {
            this.navigationService.goback();
          }
      },
      error: (error:any) => {
        HandleMessagesSubmit(this.translate, error);
      },
    });
  }

  override onCancel() {
    if (this.showinNewTab) {
      window.close();
    } else {
    //Aqui tengo que regresar a la ultima ruta
    this.navigationService.goback();
    }
  }
}
