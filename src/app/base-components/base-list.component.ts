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
  newRouteToDelete:string = '';
  routefromNewTab = '';

  constructor(
    private readonly baseSrv: BaseService,
    public readonly translate: TranslateService,
    public readonly matSnackBar: MatSnackBar,
    public readonly navigationSrv: NavigationService)
    {
      this.translate.onLangChange.subscribe((lc: any)=> {
        if(this.translate.currentLang === 'es') {
          this.displayedLabels = this.displayedLabelsEs;
        } else {
          this.displayedLabels = this.displayedLabelsEn;
        }
      });
      window.addEventListener('storage', (event) => {
        if (event.key === `${this.routefromNewTab}` && event.newValue === 'true') {
          this.handleDataChange();
        }
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.loadAll();
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
    localStorage.setItem(`${this.routefromNewTab}`, 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    localStorage.setItem('_idToEdit',JSON.stringify({id: row.id, newTab: false}));
    this.navigationSrv.NavigateTo(`${this.newRoute}`)
  }

  editNew(row:any) {
    localStorage.setItem('_idToEdit',JSON.stringify({id: row.id, newTab: true}));
    window.open(`${this.newRoute}`, '_blank')
  }

  delete(id: number) {
    this.baseSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`${this.newRouteToDelete}`)
  }

  addItem() {
    localStorage.setItem('_idToEdit',JSON.stringify({id: 0, newTab: false}));
    this.navigationSrv.NavigateTo(`${this.newRoute}`)
  }

  searchDataBase(payload: any) {
    this.baseSrv.getByFields(payload).subscribe((res:any)=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
      this.todoListo = true;
    });
  }

 cleanSearchData() {
  console.log('Metodo cleanSearchData');
}

}
