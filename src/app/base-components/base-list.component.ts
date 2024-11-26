import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../navigation/shared/services/navigation.service';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  navigationSrv = Inject(NavigationService);
  translate = Inject(TranslateService);
  baseSrv = Inject(BaseService);
  fb = Inject(FormBuilder);
  matSnackBar = Inject(MatSnackBar);

  constructor(){}

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
