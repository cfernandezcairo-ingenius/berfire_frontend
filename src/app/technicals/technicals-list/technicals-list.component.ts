import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../navigation/shared/services/navigation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../share/common/UI/table-list/table-list.component";
import { TechnicalsService  } from '../technicals.service';
import { SpinnerComponent } from "../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../navigation/shared/models/app-models';
import { openSnackBar } from '../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getLabelsTechnicalsEn, getLabelsTechnicalsEs } from './labels';

export interface ITechnicals {
  id: number,
  name: string,
  firstSurname: string,
  secondSurName: string,
  user: number
}


@Component({
  selector: 'app-technicals-list',
  templateUrl: './technicals-list.component.html',
  styles:'',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
],
providers: [TranslateService]
})
export class TechnicalsListComponent implements OnInit {

  dataSource = {
    data: [] as ITechnicals[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels: IDisplayedLabels[] = getLabelsTechnicalsEs();
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] = getLabelsTechnicalsEn();
  fg: FormGroup;

  constructor(
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly technicalsSrv: TechnicalsService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar
  ){
    this.translate.onLangChange.subscribe(lc=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });
    this.fg = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTechnicals' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.technicalsSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabTechnicals', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.technicalsSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/technicals/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.technicalsSrv._idToEdit = row.id;
    window.open(`/technicals/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/technicals/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.technicalsSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/technicals/edit/${row}`)
  }

  searchData(event: ITechnicals) {
    let payload = `?name=${event.name}`;
    if (event.firstSurname) {
      payload = payload + `&firstSurname=${event.firstSurname}`;
    }
    if (event.secondSurName) {
      payload = payload + `&secondSurName=${event.secondSurName}`;
    }
    if (event.user) {
      payload = payload + `&user=${event.user}`;
    }
    this.loading = true;
    this.technicalsSrv.getByFields(payload).subscribe(res=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
    });
    this.todoListo = true;
  }

  cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
