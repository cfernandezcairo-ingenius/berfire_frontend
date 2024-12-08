import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {SideBarComponent} from './navigation/side-bar/side-bar.component'
import { CommonModule } from '@angular/common';
import { SidebarService } from './navigation/side-bar/sidebar.service';
import { TopBarComponent } from "./share/common/UI/top-bar/top-bar.component";
import { CookieService } from 'ngx-cookie-service';
import { WindowService } from './share/services/window.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { filter, Subject, takeUntil } from 'rxjs';
import { IdTokenClaims, PromptValue } from '@azure/msal-common';
import { AccountInfo, AuthenticationResult, EventMessage, EventType, InteractionStatus, InteractionType, PopupRequest, RedirectRequest, SsoSilentRequest } from '@azure/msal-browser';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { b2cPolicies } from './auth-config';

type IdTokenClaimsWithPolicyId = IdTokenClaims & {
  acr?: string,
  tfp?: string,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    SideBarComponent,
    CommonModule,
    TopBarComponent,
    MatToolbarModule,
    RouterLink,
    MatMenuModule
  ],
  templateUrl: './app.component.html',
  providers: [TranslateService, MatToolbarModule],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();
  title = 'berFire App';
  show = false;
  darkMode = false;
  anterior = false;
  sidebarVisible = false;
  cookieValue = '';
  cookieLang = '';
  fechaExpiracion: Date = new Date();
  showTopbar: boolean = true;

  constructor(
    public readonly translate: TranslateService,
    private readonly sideBarsrv: SidebarService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    public readonly windowService: WindowService,
    @Inject(MSAL_GUARD_CONFIG) private readonly  msalGuardConfig: MsalGuardConfiguration,
    private readonly authService: MsalService,
    private readonly msalBroadcastService: MsalBroadcastService
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('es');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'es');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Se oculta la Barra Top y el sideBar si se ejecuta el componente en nueva pestaña
        this.showTopbar = !this.router.url.includes('/invoice-status/edit/new')
        && !this.router.url.includes('/banks/edit/new')
        && !this.router.url.includes('/delivery-note-states/edit/new')
        && !this.router.url.includes('/statement-order/edit/new')
        && !this.router.url.includes('/request-status/edit/new')
        && !this.router.url.includes('/populations/edit/new')
        && !this.router.url.includes('/work-status/edit/new')
        && !this.router.url.includes('/unsubscribe-reasons/edit/new')
        && !this.router.url.includes('/clients-types/edit/new')
        && !this.router.url.includes('/contracts-types/edit/new')
        && !this.router.url.includes('/taxes/edit/new')
        && !this.router.url.includes('/states-parties-review/edit/new')
        && !this.router.url.includes('/payment-forms/edit/new')
        && !this.router.url.includes('/pvp-rates/edit/new')
        && !this.router.url.includes('/prStatus/edit/new')
        && !this.router.url.includes('/manufacturers/edit/new')
        && !this.router.url.includes('/technicals/edit/new')
        && !this.router.url.includes('/documents-templates/edit/new')
        && !this.router.url.includes('/prTypes/edit/new')
        && !this.router.url.includes('/prIncidents/edit/new')
      }
    });
  }

  async ngOnInit(): Promise<void> {

    this.isIframe = window !== window.parent && !window.opener;
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window

    /**
     * You can subscribe to MSAL events as shown below. For more info,
     * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
     */
    this.msalBroadcastService.msalSubject$
    .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
    )
    .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
            window.location.pathname = "/";
        } else {
            this.setLoginDisplay();
        }
    });

    this.msalBroadcastService.inProgress$
    .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
    )
    .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
    })

    this.msalBroadcastService.msalSubject$
        .pipe(
            filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS
                || msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
                || msg.eventType === EventType.SSO_SILENT_SUCCESS),
            takeUntil(this._destroying$)
        )
        .subscribe((result: EventMessage) => {
          let payload = result.payload as AuthenticationResult;
          let idtoken = payload.idTokenClaims as IdTokenClaimsWithPolicyId;
          if (idtoken.acr === b2cPolicies.names.signUpSignIn || idtoken.tfp === b2cPolicies.names.signUpSignIn) {
              this.authService.instance.setActiveAccount(payload.account);
          }

          /**
           * For the purpose of setting an active account for UI update, we want to consider only the auth response resulting
           * from SUSI flow. "acr" claim in the id token tells us the policy (NOTE: newer policies may use the "tfp" claim instead).
           * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
           */
          if (idtoken.acr === b2cPolicies.names.editProfile || idtoken.tfp === b2cPolicies.names.editProfile) {

              // retrieve the account from initial sing-in to the app
              const originalSignInAccount = this.authService.instance.getAllAccounts()
                  .find((account: AccountInfo) =>
                      account.idTokenClaims?.oid === idtoken.oid
                      && account.idTokenClaims?.sub === idtoken.sub
                      && ((account.idTokenClaims as IdTokenClaimsWithPolicyId).acr === b2cPolicies.names.signUpSignIn
                          || (account.idTokenClaims as IdTokenClaimsWithPolicyId).tfp === b2cPolicies.names.signUpSignIn)
                  );

              let signUpSignInFlowRequest: SsoSilentRequest = {
                  authority: b2cPolicies.authorities.signUpSignIn.authority,
                  account: originalSignInAccount
              };

              // silently login again with the signUpSignIn policy
              this.authService.ssoSilent(signUpSignInFlowRequest);
          }

          /**
           * Below we are checking if the user is returning from the reset password flow.
           * If so, we will ask the user to reauthenticate with their new password.
           * If you do not want this behavior and prefer your users to stay signed in instead,
           * you can replace the code below with the same pattern used for handling the return from
           * profile edit flow (see above ln. 74-92).
           */
          if (idtoken.acr === b2cPolicies.names.resetPassword || idtoken.tfp === b2cPolicies.names.resetPassword) {
              let signUpSignInFlowRequest: RedirectRequest | PopupRequest = {
                  authority: b2cPolicies.authorities.signUpSignIn.authority,
                  prompt: PromptValue.LOGIN, // force user to reauthenticate with their new password
                  scopes: []
              };

              this.login(signUpSignInFlowRequest);
          }

          return result;
      });

      this.msalBroadcastService.msalSubject$
          .pipe(
              filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_FAILURE || msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
              takeUntil(this._destroying$)
          )
          .subscribe((result: EventMessage) => {
              // Checking for the forgot password error. Learn more about B2C error codes at
              // https://learn.microsoft.com/azure/active-directory-b2c/error-codes
              if (result.error && result.error.message.indexOf('AADB2C90118') > -1) {
                  let resetPasswordFlowRequest: RedirectRequest | PopupRequest = {
                      authority: b2cPolicies.authorities.resetPassword.authority,
                      scopes: [],
                  };

                  this.login(resetPasswordFlowRequest);
              };
          });

    this.sideBarsrv.toggleVisible$.subscribe((visible) => {
      const miDiv = document.getElementById('container_sidebar');
      if (visible) {
        miDiv!.classList.add('visible');
      } else {
        miDiv!.classList.remove('visible');
      }
    });
    this.cookieLang = this.cookieService.get('currentLang');
    if (this.cookieLang === '') {
      this.fechaExpiracion.setTime(this.fechaExpiracion.getTime() + (10 *365 * 24 * 60 * 60 * 1000));//10 años
      this.cookieService.set('currentLang', 'es', {expires: this.fechaExpiracion});
      this.translate.use('es');
    } else {
      this.translate.use(this.cookieLang);
    }
    this.windowService.loadConfig().subscribe(config => {
      this.windowService.setConfig(config);
    });
  }

setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
}

checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
        let accounts = this.authService.instance.getAllAccounts();
        // add your code for handling multiple accounts here
        this.authService.instance.setActiveAccount(accounts[0]);
    }
}

login(userFlowRequest?: RedirectRequest | PopupRequest) {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginPopup({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as PopupRequest)
                .subscribe((response: AuthenticationResult) => {
                    this.authService.instance.setActiveAccount(response.account);
                });
        } else {
            this.authService.loginPopup(userFlowRequest)
                .subscribe((response: AuthenticationResult) => {
                  this.authService.instance.setActiveAccount(response.account);
                });
        }
    } else if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest, ...userFlowRequest } as RedirectRequest);
        } else {
            this.authService.loginRedirect(userFlowRequest);
        }
}

logout() {
    this.authService.logout();
}

editProfile() {
    let editProfileFlowRequest: RedirectRequest | PopupRequest = {
        authority: b2cPolicies.authorities.editProfile.authority,
        scopes: [],
    };

    this.login(editProfileFlowRequest);
}

 ngOnDestroy() {
    // delete el listener al destruir el componente
    //window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  showMenu() {
    const miDiv = document.getElementById('container_sidebar');
    miDiv!.classList.toggle('visible');
    this.sidebarVisible = !this.sidebarVisible;
  }

  changeLanguage(language: string) {
    this.fechaExpiracion.setTime(this.fechaExpiracion.getTime() + (10 *365 * 24 * 60 * 60 * 1000));//10 años
    if (language === 'Espanol') {
      this.translate.use('es');
      this.cookieService.set('currentLang', 'es', {expires: this.fechaExpiracion});
    } else {
      this.translate.use('en')
      this.cookieService.set('currentLang', 'en', {expires: this.fechaExpiracion});
    }
  }

  toggleShow() {
    this.show = !this.show;
  }

}
