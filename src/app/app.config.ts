import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {JwtInterceptor} from '../app/jwt-interceptor.interceptor';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../app/share/common/auth-guard';
import { MatIconModule } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { PasswordToggleVisibleFieldType } from './share/common/UI/formly-form/formly-custom-components/password-toggle-visible/password-toggle-visible.component';
import { PasswordToggleVisibleMatFieldType } from './share/common/UI/formly-form/formly-custom-components/password-toggle-visible-mat/password-toggle-visible-mat.component'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { IntegerInputComponent } from './share/common/UI/formly-form/types/integer-input/integer-input.component';
import { FormlyMaterialModule } from '@ngx-formly/material';


function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const provideTranslation = () => ({
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export function minlengthValidationMessage(err: any, field:any) {
  return `Debe tener al menos ${field.props.minLength} characters`;
}

export function maxlengthValidationMessage(err: any, field:any) {
  return `La longitud máxima debe ser de ${field.props.maxLength} characters`;
}

export function minValidationMessage(err: any, field:any) {
  return `El valor debe ser mayor que ${field.props.min}`;
}

export function maxValidationMessage(err: any, field: any) {
  return `El valor debe ser menor que ${field.props.max}`;
}

export function NumberValidator(control: FormControl) {
  console.log("value:", control.value);
  console.log("invalid:", control.valid);
  console.log("touched:", control.touched);
  return /\d{1,3}/.test(control.value) ? true : { number: true };
}


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
        {
            provide:HTTP_INTERCEPTORS,
            useClass:JwtInterceptor,
            multi:true
        },
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom([
      TranslateModule.forRoot(provideTranslation()),
      FormlyBootstrapModule,
      FormlyMaterialModule,
      FormlyModule.forRoot({
        validators: [
          {name: 'required', validation: Validators.required },
          {name: 'minLength', validation: Validators.minLength(10) },
          {name: 'maxLength', validation: Validators.maxLength(30) },
          {name: 'email', validation: Validators.email },
          {name: 'mobile', validation: (control) => {
            const mobilePattern = /^\+?[1-9]\d{1,14}$/;
            return mobilePattern.test(control.value) ? null : { mobile: true }
          },},
          {name: 'number', validation: (control) => {
            const numberPattern =  /\d{1,3}/;
            return numberPattern.test(control.value) ? null : { mobile: true }
          },}
        ],
        // validationMessages: [
        //   { name: 'required', message: 'Campo obligatorio'},
        //   { name: 'minlength', message: minlengthValidationMessage },
        //   { name: 'maxlength', message: maxlengthValidationMessage },
        //   { name: 'min', message: minValidationMessage },
        //   { name: 'max', message: maxValidationMessage },
        // ],
        types: [
          { name: 'passwordToggleVisible', component: PasswordToggleVisibleFieldType },
          { name: 'passwordToggleVisibleMat', component: PasswordToggleVisibleMatFieldType},
          { name: 'integer-input', component: IntegerInputComponent}
        ],
      }),
      ReactiveFormsModule,
      BrowserAnimationsModule
    ]),
    AuthGuard,
    MatIconRegistry,
    provideRouter(routes),
    provideAnimationsAsync(), provideCharts(withDefaultRegisterables())
  ]
};

export const backendConfig = {
  url: 'http://localhost:3000'
}
