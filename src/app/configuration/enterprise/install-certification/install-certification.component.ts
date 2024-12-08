import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-install-certification',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './install-certification.component.html',
  styleUrl: './install-certification.component.scss'
})
export class InstallCertificationComponent {

  @Input() fgInstallCertification: any;

  constructor(private readonly fb: FormBuilder) {
  }

}
