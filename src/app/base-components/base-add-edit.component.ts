import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../navigation/shared/services/navigation.service';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HandleMessagesSubmit } from '../share/common/handle-error-messages-submit';
import { openSnackBar } from '../share/common/UI/utils';
import { showMessage } from '../share/common/UI/sweetalert2';

@Component({
  selector: 'app-base-add-edit',
  standalone: true,
  imports: [],
  template: '',
  styles: '',
  providers: [TranslateService]
})
export class BaseAddEditComponent implements OnInit {

  id: number = 0;
  showinNewTab: boolean = false;
  shoWButtonSaveAndNew:boolean = true;
  fields: any;
  model:any = {};
  fg = new FormGroup({});
  loading = false;
  fb: any;

  dataModifiedInNewTab = '';

  constructor(
    public readonly translate: TranslateService,
    public readonly navigationSrv: NavigationService,
    public readonly  baseSrv: BaseService,
    public readonly matSnackBar: MatSnackBar,
  ) {
    this.translate.onLangChange.subscribe({
      next:(ch:any) => {
        this.model.lang = this.translate.currentLang;
        this.updateLabels();
        this.updateValidationMessages(this.fields);
      }
    })
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
  }

  ngOnInit(): void {
    console.log('Metodo onInit');
  }

  getRegisterBase(payload:any) {
    this.baseSrv.getById(payload).subscribe({
      next:(res:any) => { this.model = { ...res.data}; },
      error: () => {
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
  }

  updateLabels() {

    this.translate.get('FORM.FIELDS.FIRSTNAME').subscribe((label:any) => {
      this.fields[0].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEAMNAME').subscribe((label: any) => {
      this.fields[1].fieldGroup[0].props.label = label;
    });
    this.translate.get('FORM.FIELDS.TEAMTITLE').subscribe((label: any) => {
      this.fields[1].fieldGroup[1].props.label = label;
    });
    this.translate.get('FORM.FIELDS.DESCRIPTION').subscribe((label: any) => {
      this.fields[2].fieldGroup[0].props.label = label;
    });
  }

  updateValidationMessages(fields:any) {
    fields.forEach((field:any) => {
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

  onSubmitBase(payload: any, nuevo:boolean = false) {

    const  myobs = this.id === 0 ?  this.baseSrv.add(payload) : this.baseSrv.edit(payload);
    myobs.subscribe({
      next: (res:any) => {
        if (res.success === true) {
          openSnackBar(this.matSnackBar, this.translate.instant('save_ok'), this.translate.currentLang);
        } else {
          HandleMessagesSubmit(this.translate, res.error);
        }
        if (res.success === true) {
          if (this.showinNewTab) {
            localStorage.setItem(`${this.dataModifiedInNewTab}`, 'true');
            if (!nuevo) window.close();
          } else if (nuevo) {
              this.fg.reset();
          } else {
            this.navigationSrv.goback();
          }
        }
      },
      error: (error:any) => {
        HandleMessagesSubmit(this.translate, error);
      },
    });
  }

  onCancelBase() {
    if (this.showinNewTab) {
      window.close();
    } else {
    this.navigationSrv.goback();
    }
  }
}
