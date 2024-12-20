import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { CommonModule } from '@angular/common';
import { ButtonSecondaryComponent } from "../../button-secondary/button-secondary.component";
import { ButtonPrimaryComponent } from "../../button-primary/button-primary.component";

@Component({
  selector: 'app-formly-material',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormlyMaterialModule, FormlyModule, CommonModule, ButtonSecondaryComponent, ButtonPrimaryComponent],
  templateUrl: './formly-material.component.html',
  styleUrl: './formly-material.component.scss',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento
})
export class FormlyMaterialComponent {
[x: string]: any;
  @Input() fields: any;
  @Input() shoWButtonSaveAndNew = false;
  show = false;
  @Input() fg: any;
  @Input() model: any;
  @Output() submitEvent = new EventEmitter();
  @Output() submitEventNew = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };

  constructor() {}

  toggleShow() {
    this.fields[4].props!.type = this.show ? 'text' : 'password'
    this.show = !this.show;
  }

  onSubmit(model: any) {
    this.submitEvent.emit(model);
  }

  onSubmitNew(model: any) {
      this.submitEventNew.emit(model);
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
