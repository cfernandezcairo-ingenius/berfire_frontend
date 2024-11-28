import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { DocumentsTemplatesService } from '../documents-templates.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { BaseListComponent } from '../../../base-components/base-list.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

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

  override dataSource = {
    data: [] as IDocumentsTemplates[]
  };
  payload: any;
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

  override newRoute: string = '/documents-templates/edit';

  constructor
  (
    private readonly documentsTemplatesSrv: DocumentsTemplatesService,
    public override readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    private readonly fb: FormBuilder
  ){
    super(documentsTemplatesSrv, translate, matSnackBar,navigationSrv);
    this.translate.get('menu.documents-templates').subscribe((translatedTitle: string) => {
      this.title = translatedTitle;
    });
    this.fg = this.fb.group({
      name:[''],
      templateType: [''],
      renderType: [''],
      predetermined:[''],
      description: [''],
      template: [''],
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabTemplates' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.loading = true;
    this.loadAll();
  }

 override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabTemplates', 'false');
    this.navigationSrv.NavigateTo('/all/edit/new')
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
    super.searchDataBase(payload);
    this.todoListo = true;
  }

 override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
