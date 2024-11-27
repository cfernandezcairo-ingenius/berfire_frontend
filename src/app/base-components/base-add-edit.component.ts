import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    public readonly translate: TranslateService,
  ) {
    this.translate.onLangChange.subscribe({
      next:(ch:any) => {
        this.model.lang = this.translate.currentLang;
        this.updateLabels();
        this.updateValidationMessages();
      }
    })
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
  }

  ngOnInit(): void {
    console.log('Metodo onInit');
  }

  updateLabels() {

    console.log('Metodo updateLabels');
  }

  updateValidationMessages() {
    console.log('Metodo updateValidationMessages');
  }

  onSubmit(model:any,nuevo:boolean = false) {
    console.log('Metodo onSubmit');
  }

  onCancel() {
    console.log('Metodo onCancel');
  }
}
