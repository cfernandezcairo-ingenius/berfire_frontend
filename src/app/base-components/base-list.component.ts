import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../navigation/shared/services/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDisplayedLabels } from '../navigation/shared/models/app-models';

@Component({
  selector: 'app-base-list',
  template: '',
  styles:'',
  standalone: true,
  imports: [
    CommonModule
],
providers: []
})
export class BaseListComponent implements OnInit {

  displayedLabels: IDisplayedLabels[] = [];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] = [];

  navigationSrv = Inject(NavigationService);
  translate = Inject(TranslateService);
  baseSrv = Inject(BaseService);
  fb = Inject(FormBuilder);
  matSnackBar = Inject(MatSnackBar);

  constructor(){
    this.translate.onLangChange.subscribe((lc: any)=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabPrTypes' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  ngOnInit(): void {
    console.log('Metodo onInit');
  }

  loadAll() {
    console.log('Metodo loadAll');
  }

  handleDataChange() {
    console.log('Metodo handleDataChange');
  }


  edit(row:any) {
    console.log('Metodo edit');
  }

  editNew(row:any) {
    console.log('Metodo editNew');
  }

  delete(id: number) {
    console.log('Metodo delete');
  }

  addItem() {
    console.log('Metodo addItem');
  }

  searchData(event: any) {
    console.log('Metodo searchData');
  }

 cleanSearchData() {
  console.log('Metodo cleanSearchData');
  }

}
