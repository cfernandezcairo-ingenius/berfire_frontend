import { Component, OnInit } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { Observable } from 'rxjs';
import { BillStatusService } from '../bill-status.service';
import Swal from 'sweetalert2';
import { StyleManager } from '../../../share/services/style-manager.service';
import { WindowService } from '../../../share/services/window.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bill-status-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule],
  templateUrl: './bill-status-add-edit.component.html',
  styleUrl: './bill-status-add-edit.component.scss'
})
export class BillStatusAddEditComponent implements OnInit {

  fields: any;
  model:any = {};
  fg = new FormGroup({});
  row:any;
  darkMode = false;
  showinNewTab = false;
  shoWButtonSaveAndNew = false;

  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private billStatusSrv: BillStatusService,
    private darkModeService: StyleManager,
    private router: Router,
    private windowService: WindowService
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
      this.shoWButtonSaveAndNew = true;
      this.model = {
        isPaid: false,
        isReturned: false,
        isSent: false,
        isUnPaid:false,
        isPending:false
      }
    } else {
      //edit
      //this.title = this.translate.instant('editItem');
      this.model = Object.assign({}, this.row);
      this.shoWButtonSaveAndNew = false;
    }

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-sm-12 col-md-126 col-lg-12',
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
            type: 'checkbox',
            key: 'isPaid',
            props: {
              label: 'FORM.FIELDS.PAID',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isReturned',
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
            key: 'isPending',
            props: {
              label: 'FORM.FIELDS.PENDING',
              required:false
            },
          },
          {
            className: 'col-sm-12 col-md-6 col-lg-6',
            type: 'checkbox',
            key: 'isSent',
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
            key: 'isUnPaid',
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

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    let myobs = new Observable<any>;
    if (this.row.id === 0) {
      payload = {
        name: this.fg!.get('name')?.value,
        isPaid: this.fg!.get('isPaid')?.value === undefined ? false : this.fg!.get('isPaid')?.value,
        isReturned: this.fg!.get('isReturned')?.value === undefined ? false : this.fg!.get('isReturned')?.value,
        isPending: this.fg!.get('isPending')?.value === undefined ? false : this.fg!.get('isPending')?.value,
        isSent: this.fg!.get('isSent')?.value === undefined ? false : this.fg!.get('isSent')?.value,
        isUnPaid: this.fg!.get('isUnPaid')?.value === undefined ? false : this.fg!.get('isUnPaid')?.value,
      }
      myobs = this.billStatusSrv.add(payload);
    } else {
      payload = {
        id: this.row.id,
        name: this.fg!.get('name')?.value,
        isPaid: this.fg!.get('isPaid')?.value,
        isReturned: this.fg!.get('isReturned')?.value,
        isSent: this.fg!.get('isSent')?.value,
        isUnPaid: this.fg!.get('isUnPaid')?.value,
        isPending: this.fg!.get('isPending')?.value,
      }
      myobs = this.billStatusSrv.edit(payload);
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
        //Aqui tengo que preguntar si nuevo = true
        //Para limpiar el formulario
        //y permanecer en la ventana
        if (this.showinNewTab) {
          localStorage.setItem('dataModifiedInNewTabBillStatements', 'true');
          this.showinNewTab = false
          if (!nuevo) window.close();
        } else {
          if (nuevo) {
            this.fg.reset();
          } else {
            this.navigationService.goback();
          }
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
