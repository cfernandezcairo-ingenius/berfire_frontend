import { Component, EventEmitter,Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CommonModule } from '@angular/common';
import { ButtonSecondaryComponent } from "../../button-secondary/button-secondary.component";
import { ButtonPrimaryComponent } from "../../button-primary/button-primary.component";

@Component({
  selector: 'app-formly-bootstrap',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, FormlyBootstrapModule, FormlyModule, CommonModule, ButtonSecondaryComponent, ButtonPrimaryComponent],
  templateUrl: './formly-bootstrap.component.html',
  styleUrl: './formly-bootstrap.component.scss',
})
export class FormlyBootstrapComponentt {
  @Input() fields: any;
  @Input() model:any;
  @Input() fg: any;
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  show = false;
  darkMode = false;

  constructor() { }

  onSubmit(model: any) {
    this.submitEvent.emit(model);
  }

  onCancel() {
    this.cancelEvent.emit();
  }
}
