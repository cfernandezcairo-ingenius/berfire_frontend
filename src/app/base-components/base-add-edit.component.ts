import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../navigation/shared/services/navigation.service';
import { BaseService } from './base.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  translate = Inject(TranslateService);
  navigationService = Inject(NavigationService);
  baseSrv = Inject(BaseService);
  router = Inject(Router);
  matSnackBar = Inject(MatSnackBar);

  constructor(

  ) {
    this.translate.onLangChange.subscribe({
      next:(ch:any) => {
        this.model.lang = this.translate.currentLang;
        this.updateLabels();
        this.updateValidationMessages();
      }
    })
    this.router.events.subscribe({
      next: (event:any) => {
        if (event instanceof NavigationEnd) {
          this.showinNewTab = this.router.url.includes('/prTypes/edit/new');
        }
      }
    });
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

  onSubmit(model:any, nuevo:boolean = false) {
    console.log('Metodo onSubmit');
  }

  onCancel() {
    console.log('Metodo onCancel');
  }
}
