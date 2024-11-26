import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';
import { NavigationService } from '../navigation/shared/services/navigation.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prTypes-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: []
})
export class BaseDeleteComponent implements OnInit {

  id:number = 0;
  translate = Inject(TranslateService);
  baseSrv = Inject(BaseService);
  navigationSrv = Inject(NavigationService);
  matSnackBar = Inject(MatSnackBar);
   constructor() { }

  ngOnInit(): void {
    console.log('Metodo onInit');
  }

  delete(id: number) {
    console.log('Metodo delete');
  }
}
