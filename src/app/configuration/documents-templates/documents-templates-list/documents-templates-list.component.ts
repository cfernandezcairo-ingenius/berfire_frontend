import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { DocumentsTemplatesService } from '../documents-templates.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IDocumentsTemplates {
  id: number,
  name: string,
  templateType: string,
  renderType: string,
  predetermined: boolean,
  description: string,
  template: string
}


@Component({
  selector: 'app-documents-templates-list',
  templateUrl: './documents-templates-list.component.html',
  styleUrl: './documents-templates-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
})
export class DocumentsTemplatesListComponent implements OnInit {

  dataSource = {
    data: [] as IDocumentsTemplates[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;

  displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Tipo plantilla',isBoolean:false},
    { name: 'Tipo Renderizao',isBoolean:false},
    { name: 'Predeterminado', isBoolean:true},
    { name: 'Descripción', isBoolean:false},
    { name: 'Plantilla', isBoolean:false},
  ];
  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'Template type',isBoolean:false},
    { name: 'Render type',isBoolean:false},
    { name: 'Predetermined', isBoolean:true},
    { name: 'Descripction', isBoolean:false},
    { name: 'Template', isBoolean:false},
  ];
  fg: FormGroup;

  constructor(
    private readonly darkModeService: StyleManager,
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly documentsTemplatesSrv: DocumentsTemplatesService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
    this.translate.onLangChange.subscribe(lc=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });

    this.fg = this.fb.group({
      name:[''],
      templateType: [''],
      renderType: [''],
      predetermined:[''],
      description: [''],
      template: [''],
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTemplates' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.documentsTemplatesSrv.getAll().subscribe(All => {
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
    localStorage.setItem('dataModifiedInNewTabTemplates', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.navigationSrv.NavigateTo(`/documents-templates/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    window.open(`/documents-templates/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.navigationSrv.NavigateTo(`/documents-templates/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/documents-templates/edit/${row}`)
  }

    searchData(event: IDocumentsTemplates) {
    let payload = `?name=${event.name}`;
    if (event.templateType) {
      payload = payload + `&templateType=${event.templateType}`;
    }
    if (event.renderType) {
      payload = payload + `&renderType=${event.renderType}`;
    }
    if (event.predetermined) {
      payload = payload + `&predetermined=${event.predetermined}`;
    }
    if (event.description) {
      payload = payload + `&description=${event.description}`;
    }
    if (event.template) {
      payload = payload + `&template=${event.template}`;
    }
    this.loading = true;
    this.documentsTemplatesSrv.getByFields(payload).subscribe(res=> {
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
