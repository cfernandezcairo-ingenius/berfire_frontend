import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormlyBootstrapComponentt } from "./formly-bootstrap/formly-bootstrap.component";
import { FormlyMaterialComponent } from './formly-material/formly-material.component';

@Component({
  selector: 'app-formly-base',
  standalone: true,
  imports: [FormlyBootstrapComponentt, FormlyMaterialComponent],
  templateUrl: './formly-base.component.html',
  styleUrl: './formly-base.component.scss',
})
export class FormlyBaseComponent {
  @Input() theme: string = '';
  @Input() fields: any;
  @Input() model: any;
  @Input() fg: any;
  @Input() shoWButtonSaveAndNew = false;
  @Output() submitEvent = new EventEmitter();
  @Output() submitEventNew = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  onSubmit(model:any) {
    this.submitEvent.emit(model);
  }

  onSubmitNew(model:any) {
    this.submitEventNew.emit(model);
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
