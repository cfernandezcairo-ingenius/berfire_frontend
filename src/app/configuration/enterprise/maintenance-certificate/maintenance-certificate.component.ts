import { Component, Input } from '@angular/core';
import {  ReactiveFormsModule,FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance-certificate',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './maintenance-certificate.component.html',
  styleUrl: './maintenance-certificate.component.scss'
})
export class MaintenanceCertificateComponent {

  @Input() fgMaintenanceCertification: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.fgMaintenanceCertification = fb.group({
      maintenanceCertificationHeader: [],
      maintenanceCertificationFooter: []
    });
  }

  addInHeader(text:string) {
    this.fgMaintenanceCertification.get('maintenanceCertificationHeader')?.setValue(this.fgMaintenanceCertification.get('maintenanceCertificationHeader')?.value + ' ' + text);
  }

  addInFooter(text:string) {
    this.fgMaintenanceCertification.get('maintenanceCertificationFooter')?.setValue(this.fgMaintenanceCertification.get('maintenanceCertificationFooter')?.value + ' ' + text);
  }

}
