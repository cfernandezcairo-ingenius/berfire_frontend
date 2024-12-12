import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { TechnicalsService } from '../technicals.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../navigation/shared/services/navigation.service';
import { generateFieldsTechnicals } from './technicals-add-edit-fields';

@Component({
  selector: 'app-technicals-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './technicals-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class TechnicalsAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabTechnicals';

  constructor(
    private readonly technicalsSrv: TechnicalsService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,technicalsSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showinNewTab = this.router.url.includes('/technicals/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsTechnicals(translate);
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        firstSurname: this.fg.get('firstSurname')?.value,
        secondSurName: this.fg.get('secondSurName')?.value,
        user: Number(this.fg.get('user')?.value)
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        firstSurname: this.fg.get('firstSurname')?.value,
        secondSurName: this.fg.get('secondSurName')?.value,
        user: Number(this.fg.get('user')?.value)
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
    super.onCancelBase()
  }
}
