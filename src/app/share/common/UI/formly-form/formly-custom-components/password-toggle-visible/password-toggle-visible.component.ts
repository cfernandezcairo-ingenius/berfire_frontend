import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { VisibleNovisibleComponent } from '../../../visible-novisible/visible-novisible.component';

@Component({
  selector: 'formly-field-password-toggle-visible',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FormlyModule, VisibleNovisibleComponent  ],
  template: `<div style="position: relative;display: flex;flex-direction: column;">
  <label for="inputPassword">Password</label>
  <input class="form-control" [type]="show ? 'text' : 'password'"  id="inputPassword" [formControl]="formControl" [formlyAttributes]="field">
  <app-visible-novisible [show]="show" (toggleShowEmitter)="toggleShow()" ></app-visible-novisible>
</div>
<style>
  .visibilityClass {
      color: rgb(135 156 175 / 1);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      padding-right: 0.5rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1.25rem;
      z-index: 999;
      margin-top: 24px;
    }
</style>
`,
})
export class PasswordToggleVisibleFieldType extends FieldType<FieldTypeConfig> {

  show = false;

  toggleShow() {
    this.show = !this.show;
  }

}
