import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
export class FormlyMaterialComponent implements OnInit {
[x: string]: any;
  @Input() fields: any;
  @Input() showButtonGuardarYNuevo = false;
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

  ngOnInit(): void {

  }

  toggleShow() {
    this.fields[4].props!.type = this.show ? 'text' : 'password'
    this.show = !this.show;
  }

  onSubmit(model: any) {
    if (this.showButtonGuardarYNuevo) {
      this.submitEventNew.emit(model);
    } else {
      this.submitEvent.emit(model);
    }
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
