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
  show = false;
  @Input() fg: any;
  @Input() model: any;
  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();
  options: FormlyFormOptions = {
    formState: {
      disabled: true,
    },
  };
  // fields: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: 'row',
  //     fieldGroup: [
  //       {
  //         className: 'col-6',
  //         type: 'input',
  //         key: 'firstName',
  //         props: {
  //           label: 'First Name',
  //           required: true
  //         },
  //         validation: {
  //           messages: {
  //             pattern: (error, field: FormlyFieldConfig) => `"${field.formControl!.value}" is not a valid IP Address`,
  //           },
  //         },
  //       },
  //       {
  //         className: 'col-6',
  //         type: 'input',
  //         key: 'lastName',
  //         props: {
  //           label: 'Last Name',
  //           required:true
  //         },
  //         expressionProperties: {
  //           'props.disabled': '!model.firstName',
  //         },
  //       },
  //     ],
  //   },
  //   {
  //     className: 'section-label',
  //     template: '<hr /><div><strong>Address:</strong></div>',
  //   },
  //   {
  //     fieldGroupClassName: 'row',
  //     fieldGroup: [
  //       {
  //         className: 'col-6',
  //         type: 'input',
  //         key: 'street',
  //         props: {
  //           label: 'Street',
  //           minLength: 10
  //         },
  //       },
  //       {
  //         className: 'col-3',
  //         type: 'input',
  //         key: 'cityName',
  //         props: {
  //           label: 'City',
  //         },
  //       },
  //       {
  //         className: 'col-3',
  //         type: 'input',
  //         key: 'zip',
  //         props: {
  //           type: 'number',
  //           label: 'Zip',
  //           max: 99999,
  //           min: 0,
  //           pattern: '\\d{5}',
  //         },
  //       },
  //     ],
  //   },
  //   { template: '<hr />' },
  //   {
  //     type: 'input',
  //     key: 'password',
  //     props: {
  //       label: 'Password',
  //       type: 'password'
  //     },
  //   },
  //   {
  //     type: 'button',
  //     key: 'toggle',
  //     props: {
  //       text: 'toggle'
  //     }
  //   }
  // ];

  constructor() {}

  ngOnInit(): void {

  }

  toggleShow() {
    this.fields[4].props!.type = this.show ? 'text' : 'password'
    this.show = !this.show;
  }

  onSubmit(model: any) {
    this.submitEvent.emit(model);
  }

  onCancel() {
    this.cancelEvent.emit();
  }

}
