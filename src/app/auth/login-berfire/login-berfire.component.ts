import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../share/services/window.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { VisibleNovisibleComponent } from "../../share/common/UI/visible-novisible/visible-novisible.component";

@Component({
  selector: 'app-login-berfire',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, TranslateModule, MatFormFieldModule, MatInputModule, MatLabel, VisibleNovisibleComponent],
  templateUrl: './login-berfire.component.html',
  providers: [HttpClient],
  styleUrl: './login-berfire.component.scss',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento
})
export class LoginBerfireComponent  {

  isLoading = false;
  fg: FormGroup;
  isPC = false;
  isTablet = false;
  isMobile = false;
  show = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSrv: AuthService,
    private readonly winservice: WindowService,
    private readonly router: Router
  ) {
    this.fg = this.fb.group({
      token: [''],
      email: ['reynol@ingeniuscuba.com', [Validators.required, Validators.email]],
      password: ['12345', Validators.required],
    });
    this.setLayout();
  }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.setLayout();
    }

    setLayout() {
      this.isPC = this.winservice.isDevicePC;
      this.isTablet = this.winservice.isDeviceTablet;
      this.isMobile = this.winservice.isDeviceMobile;
    }

    onSubmit() {
    }

  toggleShow() {
    this.show = !this.show;
  }

  get buttonIsDisabled() {
    return !this.fg.valid;
  }

}
