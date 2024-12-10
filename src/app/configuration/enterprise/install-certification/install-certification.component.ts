import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-install-certification',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './install-certification.component.html',
  styleUrl: './install-certification.component.scss'
})
export class InstallCertificationComponent {

  @Input() fgInstallCertification: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.fgInstallCertification = fb.group({
      certificateInstallationHeader: [],
      certificateInstallationFooter: []
    });
  }

  addInHeader(text:string) {
    this.fgInstallCertification.get('certificateInstallationHeader')?.setValue(this.fgInstallCertification.get('certificateInstallationHeader')?.value + ' ' + text);
  }

  addInFooter(text:string) {
    this.fgInstallCertification.get('certificateInstallationFooter')?.setValue(this.fgInstallCertification.get('certificateInstallationFooter')?.value + ' ' + text);
  }

}
