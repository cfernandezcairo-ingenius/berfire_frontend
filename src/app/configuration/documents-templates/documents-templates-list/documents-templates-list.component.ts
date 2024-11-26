import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { DocumentsTemplatesService } from '../documents-templates.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

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
],
})
export class DocumentsTemplatesListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IDocumentsTemplates[]
  };
  payload: any;
  loading = false;
  todoListo = false;
  title: string = '';

  override displayedLabels:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Nombre',isBoolean:false},
    { name: 'Tipo plantilla',isBoolean:false},
    { name: 'Tipo Renderizao',isBoolean:false},
    { name: 'Predeterminado', isBoolean:true},
    { name: 'Descripción', isBoolean:false},
    { name: 'Plantilla', isBoolean:false},
  ];
  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn:IDisplayedLabels[] = [
    { name: '',isBoolean:false},
    { name: 'Name',isBoolean:false},
    { name: 'Template type',isBoolean:false},
    { name: 'Render type',isBoolean:false},
    { name: 'Predetermined', isBoolean:true},
    { name: 'Descripction', isBoolean:false},
    { name: 'Template', isBoolean:false},
  ];
  fg: FormGroup;

  documentsTemplatesSrv: any;

  constructor
  (
  ){
    super();
    this.translate.get('menu.documents-templates').subscribe((translatedTitle: string) => {
      this.title = translatedTitle;
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTemplates' && event.newValue === 'true') {
        this.handleDataChange();
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

  override ngOnInit(): void {
    this.documentsTemplatesSrv = this.baseSrv as DocumentsTemplatesService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.documentsTemplatesSrv.getAll().subscribe((All:any) => {
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

 override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabTemplates', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.documentsTemplatesSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/documents-templates/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.documentsTemplatesSrv._idToEdit = row.id;
    window.open(`/documents-templates/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.documentsTemplatesSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/documents-templates/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.documentsTemplatesSrv._idToEdit = 0;
    this.navigationSrv.NavigateTo(`/documents-templates/edit/${row}`)
  }

  override searchData(event: IDocumentsTemplates) {
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
    this.documentsTemplatesSrv.getByFields(payload).subscribe((res:any)=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
      } else {
        this.dataSource = { data: res.data };
      }
    });
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
