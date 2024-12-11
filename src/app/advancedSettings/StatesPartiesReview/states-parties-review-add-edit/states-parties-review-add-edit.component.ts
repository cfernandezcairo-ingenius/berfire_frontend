import { Component } from '@angular/core';
import { FormlyBaseComponent } from '../../../share/common/UI/formly-form/formly-base.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { StatesPartiesReviewService } from '../states-parties-review.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../share/common/UI/spinner/spinner.component';
import { BaseAddEditComponent } from '../../../base-components/base-add-edit.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { generateFieldsStatesPartiesReview } from './states-parties-review-add-edit-fields';

@Component({
  selector: 'app-states-parties-review-add-edit',
  standalone: true,
  imports: [FormlyBaseComponent, TranslateModule, CommonModule, SpinnerComponent],
  templateUrl: './states-parties-review-add-edit.component.html',
  styles: '',
  providers: [TranslateService]
})
export class StatesPartiesReviewAddEditComponent extends BaseAddEditComponent {

  override dataModifiedInNewTab = 'dataModifiedInNewTabStatesPartiesReview';

  constructor(
    private readonly statesPartiesReviewSrv: StatesPartiesReviewService,
    public override  readonly translate: TranslateService,
    public override readonly matSnackBar: MatSnackBar,
    public override readonly navigationSrv: NavigationService,
    public readonly router: Router
  ) {
    super(translate, navigationSrv,statesPartiesReviewSrv,matSnackBar);
    this.router.events.subscribe((event:any) => {
      if (event instanceof NavigationEnd) {
        this.showinNewTab = this.router.url.includes('/states-parties-review/edit/new');
      }
    });
    this.id = 0;
    this.showinNewTab = false;
    this.shoWButtonSaveAndNew = true;
    this.fields = generateFieldsStatesPartiesReview(translate);
  }

  override ngOnInit(): void {

    let inputs = localStorage.getItem!('_idToEdit');
    let tmp = JSON.parse(inputs!);
    this.id = tmp.id;
    this.showinNewTab = tmp.newTab;
    if (this.id === 0 && !this.showinNewTab) {
      this.shoWButtonSaveAndNew = true;
    } else {
      this.shoWButtonSaveAndNew = false
    }
    this.loading = true;
    super.getRegisterBase({id: this.id});
  }

  onSubmit(model:any, nuevo:boolean = false) {
    let payload = {};
    if (this.id === 0) {
      payload = {
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value === undefined ? null : this.fg.get('description')?.value,
      }
    } else {
      payload = {
        id: this.id,
        name: this.fg.get('name')?.value,
        description: this.fg.get('description')?.value,
      }
    }
    super.onSubmitBase(payload);
  }

  onCancel() {
   super.onCancelBase();
  }
}
