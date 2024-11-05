import { Component, OnInit } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { Observable } from 'rxjs';
import { EstadosFacturasService } from '../estados-facturas.service';
import Swal from 'sweetalert2';
import { StyleManager } from '../../../share/services/style-manager.service';

@Component({
  selector: 'app-estados-facturas-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule],
  templateUrl: './estados-facturas-add-edit.component.html',
  styleUrl: './estados-facturas-add-edit.component.scss'
})
export class EstadosFacturasAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  row:any;
  darkMode = false;
  showinNewTab = false;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private estadosFacturasSrv: EstadosFacturasService,
    private darkModeService: StyleManager,
    private router: Router
  ) {
    this.translate.onLangChange.subscribe(ch=> {
      this.model.lang = this.translate.currentLang;
      this.updateLabels();
      this.updateValidationMessages();
    })
    this.route.params.subscribe((params: { [x: string]: string; }) => {
      this.row = JSON.parse(params['id']);
    });
    this.fg.valueChanges.subscribe(v=> {
      //Aqui tengo los datos para cuando capture el submit
    });
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/invoice-status/edit/new');
      }
    });
  }

  ngOnInit(): void {
    if (this.row.id === 0) {
      //Agregar
      //this.title = this.translate.instant('addItem');
    } else {
      //Editar
      //this.title = this.translate.instant('editItem');
      this.model = Object.assign({}, this.row);
    }

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-126 col-lg-12',
            type: 'input',
            key: 'nombre',
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
            type: 'checkbox',
            key: 'pagado',
            props: {
              label: 'FORM.FIELDS.PAID',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'devuelto',
            props: {
              label: 'FORM.FIELDS.RETURNED',
              required:false
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'pendiente',
            props: {
              label: 'FORM.FIELDS.PENDING',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'enviado',
            props: {
              label: 'FORM.FIELDS.SENT',
              required:false
            },
          },
        ],
      },
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-12 col-lg-12',
            type: 'checkbox',
            key: 'impagado',
            props: {
              label: 'FORM.FIELDS.NOTPAID',
              required:false
            }
          },
        ],
      }
    ];
    this.updateLabels();
  }

  updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PAID').subscribe((label) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.RETURNED').subscribe((label) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.PENDING').subscribe((label) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.SENT').subscribe((label) => {
      this.fields[2].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.NOTPAID').subscribe((label) => {
      this.fields[3].fieldGroup[0].props.label = label;
    });
  }

  updateValidationMessages() {
    this.fields.forEach((field:any) => {
      if (field.fieldGroup) {
        field.fieldGroup.forEach((fG: any) => {
          if (fG.validation && fG.validation.messages) {
            fG.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
          }
        });
      } else {
        if (field.validation && field.validation.messages) {
          field.validation.messages.required = this.translate.instant('FORM.VALIDATION.REQUIRED');
        }
      }
    });
  }

  onSubmit(model:any) {
    let payload = {};
    let myobs = new Observable<any>;
    if (this.row.id === 0) {
      payload = {
        nombre: this.fg!.get('nombre')?.value,
        pagado: this.fg!.get('pagado')?.value,
        pendiente: this.fg!.get('pendiente')?.value,
        enviado: this.fg!.get('enviado')?.value,
        impagado: this.fg!.get('impagado')?.value,
      }
      myobs = this.estadosFacturasSrv.add(payload);
    } else {
      payload = {
        id: this.row.id,
        nombre: this.fg!.get('nombre')?.value,
        pagado: this.fg!.get('pagado')?.value,
        pendiente: this.fg!.get('pendiente')?.value,
        enviado: this.fg!.get('enviado')?.value,
        impagado: this.fg!.get('impagado')?.value,
      }
      myobs = this.estadosFacturasSrv.edit(payload);
    }
    myobs.subscribe({
      next: (res) => {
        if (res.success === true) {
          Swal.fire({
            title: this.translate.instant('inform'),
            text: this.translate.instant('save_ok'),
            icon: 'success',
            showConfirmButton:true,
            confirmButtonText: 'OK',
            background: this.darkMode ? '#444' : '#fff',
            color: this.darkMode ? '#fff' : '#000',
          })
        } else {
          Swal.fire({
            title: this.translate.instant('inform'),
            text: this.translate.instant('save_error'),
            icon: 'error',
            showConfirmButton:true,
            confirmButtonText: 'OK',
            background: this.darkMode ? '#444' : '#fff',
            color: this.darkMode ? '#fff' : '#000',
          })
        }
        if (this.showinNewTab) {
          localStorage.setItem('dataModifiedInNewTab', 'true');
          window.close();
        } else {
          this.navigationService.goback();
        }
      },
      error: (error) => {
        console.error('Error:', error);
        Swal.fire({
          title: this.translate.instant('inform'),
          text: this.translate.instant('save_error'),
          icon: 'error',
          showConfirmButton:true,
          confirmButtonText: 'OK',
          background: this.darkMode ? '#444' : '#fff',
          color: this.darkMode ? '#fff' : '#000',
        })
      },
    });
  }

  onCancel() {
    if (this.showinNewTab) {
      window.close();
    } else {
    //Aqui tengo que regresar a la ultima ruta
    this.navigationService.goback();
    }
  }
}
