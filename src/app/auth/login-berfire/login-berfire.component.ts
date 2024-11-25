import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../share/services/window.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { StyleManager } from '../../share/services/style-manager.service';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-berfire',
  standalone: true,
  imports: [FormsModule , ReactiveFormsModule, CommonModule, TranslateModule, MatFormFieldModule, MatInputModule, MatLabel],
  templateUrl: './login-berfire.component.html',
  providers: [HttpClient],
  styleUrl: './login-berfire.component.scss',
  encapsulation: ViewEncapsulation.None, // Desactiva el encapsulamiento
})
export class LoginBerfireComponent implements OnInit {

  isLoading = false;
  fg: FormGroup;
  isPC = false;
  isTablet = false;
  isMobile = false;
  show = false;
  darkMode = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authSrv: AuthService,
    private readonly winservice: WindowService,
    private readonly darkModeService: StyleManager,
    private readonly router: Router
  ) {
    this.fg = this.fb.group({
      token: [''],
      email: ['reynol@ingeniuscuba.com', [Validators.required, Validators.email]],
      password: ['12345', Validators.required],
    });
    this.setLayout();
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
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

    ngOnInit(): void {
      this.darkModeService.darkMode$.subscribe(dark => {
        this.darkMode = dark;
      });
    }

    onSubmit() {
      if (this.fg.valid) {
        localStorage.setItem('access_token', '');
        this.authSrv.login(this.fg.controls['email'].value, this.fg.controls['password'].value)
        .subscribe(res => {
          if (res.token) {
            localStorage.setItem('access_token', res.token);
            localStorage.setItem('refresh_token', res.token);
            localStorage.setItem('authenticated_user', this.fg.controls['email'].value);
            this.authSrv.startTokenRenewal();
            this.router.navigateByUrl('/dashboard');
          }
        });

      } else {
        console.log('Formulario no válido');
      }
    }

  toggleShow() {
    this.show = !this.show;
  }

  get buttonIsDisabled() {
    return !this.fg.valid;
  }

}
