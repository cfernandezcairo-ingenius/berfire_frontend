import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DocumentsTemplatesService } from '../documents-templates.service';
import { BaseDeleteComponent } from '../../../base-components/base-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-documents-templates-delete',
  standalone: true,
  imports: [],
  template: ``,
  styles: [],
  providers: [TranslateService]
})
export class DocumentsTemplatesDeleteComponent extends BaseDeleteComponent {

  constructor(
    private readonly documentsTemplatesSrv: DocumentsTemplatesService,
    public  override readonly translate: TranslateService,
    public override readonly navigationSrv: NavigationService,
    public override readonly matSnackBar: MatSnackBar
  ) {
    super(documentsTemplatesSrv,translate,navigationSrv,matSnackBar);
  }

  override ngOnInit(): void {
    this.id = this.documentsTemplatesSrv._idToDelete;
    super.deleteBase(this.id);
  }
}
