import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-integer-input',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, ReactiveFormsModule, FormlyModule],
  template: `<mat-form-field>
    <input matInput id="formFieldControl"
    type="input"
    [readonly]="true"
    required="true"
    [formControl]="formControl"
    [formlyAttributes]="field"
  />
</mat-form-field>`,
  styleUrl: './integer-input.component.scss'
})
export class IntegerInputComponent extends FieldType<FieldTypeConfig> {
  @ViewChild(MatInput) formFieldControl!: MatInput;

}
