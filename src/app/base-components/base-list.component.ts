import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IDisplayedLabels } from '../navigation/shared/models/app-models';
import { openSnackBar } from '../share/common/UI/utils';
import { NavigationService } from '../navigation/shared/services/navigation.service';

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
  dataSource: any;
  loading:boolean = false;
  todoListo:boolean = false;
  newRoute:string = '';

  constructor(
    private readonly baseSrv: BaseService,
    public readonly translate: TranslateService,
    public readonly matSnackBar: MatSnackBar,
    public readonly navigationSrv: NavigationService)
    {
      window.addEventListener('storage', (event) => {
        if (event.key === 'dataModifiedInNewTabPrTypes' && event.newValue === 'true') {
          this.handleDataChange();
        }
      });
      this.translate.onLangChange.subscribe((lc: any)=> {
        if(this.translate.currentLang === 'es') {
          this.displayedLabels = this.displayedLabelsEs;
        } else {
          this.displayedLabels = this.displayedLabelsEn;
        }
      });
  }

  ngOnInit(): void {
    console.log('Metodo onInit');
  }

  loadAll() {
    this.baseSrv.getAll().subscribe((All:any) => {
      if (All.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        this.addItem();
      } else {
        this.dataSource = { data: All.data };;
        this.loading = false;
        this.todoListo = true;
      }
    })
  }

  handleDataChange() {
    console.log('Metodo handleDataChange');
  }


  edit(row:any) {
    this.baseSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`${this.newRoute}`)
  }

  editNew(row:any) {
    this.baseSrv._idToEdit = row.id;
    window.open(`${this.newRoute}`, '_blank')
  }

  delete(id: number) {
    this.baseSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`${this.newRoute}`)
  }

  addItem() {
    this.baseSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`${this.newRoute}`)
  }

  searchData(event: any) {
    console.log('Metodo searchData');
  }

 cleanSearchData() {
  console.log('Metodo cleanSearchData');
  }

}
