import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { AuthGuard } from '../app/share/common/auth-guard';
import { MatIconRegistry } from '@angular/material/icon';
import { BrowserAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { PasswordToggleVisibleFieldType } from './share/common/UI/formly-form/formly-custom-components/password-toggle-visible/password-toggle-visible.component';
import { PasswordToggleVisibleMatFieldType } from './share/common/UI/formly-form/formly-custom-components/password-toggle-visible-mat/password-toggle-visible-mat.component'
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { IPublicClientApplication, PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
    MsalGuard, MsalBroadcastService, MsalService,
    MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalGuardConfiguration, MsalRedirectComponent, MsalModule,
    MsalInterceptor
} from '@azure/msal-angular';
import { loginRequest, msalConfig, msalInstance } from './auth-config';
import { AuthInterceptor } from './auth.interceptor';
import { QuillModule } from 'ngx-quill';


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

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
      interactionType: InteractionType.Redirect,
      authRequest: loginRequest
  };
}


export const appConfig: ApplicationConfig = {
  providers: [
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  provideHttpClient(withInterceptorsFromDi()),
  /// Proveedor de MSAL
  {
    provide: 'MSAL_INSTANCE',
    useValue: msalInstance,
  },
  {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNoopAnimations(),
    importProvidersFrom([
      MsalRedirectComponent,
      TranslateModule.forRoot(provideTranslation()),
      QuillModule.forRoot(),
      FormlyBootstrapModule,
      FormlyMaterialModule,
      FormlyModule.forRoot({
        validators: [
          {name: 'required', validation: Validators.required },
          {name: 'minLength', validation: Validators.minLength(10) },
          {name: 'maxLength', validation: Validators.maxLength(30) },
          {name: 'email', validation: Validators.email },
          { name: 'min', validation: Validators.min(0) },
          { name: 'max',  validation: Validators.max(999) },
          {name: 'mobile', validation: (control) => {
            const mobilePattern = /^\+?[1-9]\d{1,14}$/;
            return mobilePattern.test(control.value) ? null : { mobile: true }
          },},
          {name: 'number', validation: (control) => {
            const numberPattern =  /\d{1,3}/;
            return numberPattern.test(control.value) ? null : { number: true }
          },}
        ],
        validationMessages: [
          { name: 'required', message: 'Campo obligatorio'},
          { name: 'minlength', message: minlengthValidationMessage },
          { name: 'maxlength', message: maxlengthValidationMessage },
          { name: 'min', message: minValidationMessage },
          { name: 'max', message: maxValidationMessage },
        ],
        types: [
          { name: 'passwordToggleVisible', component: PasswordToggleVisibleFieldType },
          { name: 'passwordToggleVisibleMat', component: PasswordToggleVisibleMatFieldType},
        ],
      }),
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MsalInterceptor
    ]),
    AuthGuard,
    MsalModule,
    MatIconRegistry,
    provideRouter(routes),
    provideAnimationsAsync(), provideCharts(withDefaultRegisterables())
  ]
};
