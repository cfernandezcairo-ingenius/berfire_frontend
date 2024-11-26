import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-password-toggle-visible',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, FormlyModule  ],
  template: `<div style="position: relative;display: flex;flex-direction: column;">
  <label for="inputPassword">Password</label>
  <input class="form-control" [type]="show ? 'text' : 'password'"  id="inputPassword" [formControl]="formControl" [formlyAttributes]="field">
  <div onkeypress="" (click)="toggleShow()" class="visibilityClass" aria-label="Toggle password visibility">
    <div *ngIf="!show">
        <svg style="font-weight: 300;width: 1.5rem;height: 1.5rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>

    </div>
    <div *ngIf="show">
        <svg style="font-weight: 300;width: 1.5rem;height: 1.5rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
        </svg>
    </div>
  </div>
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
