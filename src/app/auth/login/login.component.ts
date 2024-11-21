import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fg: FormGroup;

  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router) {
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.fg.valid) {
      localStorage.setItem('access_token', '');
      this.authSrv.login(this.fg.controls['email'].value, this.fg.controls['password'].value)
      .subscribe(res => {
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('authenticated_user', this.fg.controls['email'].value);
          this.authSrv.startTokenRenewal();
          this.router.navigateByUrl('dashboard');
        }
      });

    } else {
      console.log('Formulario no válido');
    }
  }

}
