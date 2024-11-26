import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {SideBarComponent} from './navigation/side-bar/side-bar.component'
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { SidebarService } from './navigation/side-bar/sidebar.service';
import { StyleManager } from './share/services/style-manager.service';
import { TopBarComponent } from "./share/common/UI/top-bar/top-bar.component";
import { CookieService } from 'ngx-cookie-service';
import { WindowService } from './share/services/window.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, SideBarComponent, CommonModule, TopBarComponent],
  templateUrl: './app.component.html',
  providers: [TranslateService],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
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
    private readonly darkModeService: StyleManager,
    public readonly authService: AuthService,
    private readonly sideBarsrv: SidebarService,
    private readonly cookieService: CookieService,
    private readonly router: Router,
    public readonly windowService: WindowService
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
      }
    });
  }

  ngOnInit(): void {
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });

    this.sideBarsrv.toggleVisible$.subscribe((visible) => {
      if (visible !== this.sidebarVisible) {
        const miDiv = document.getElementById('container_sidebar');
        miDiv!.classList.toggle('visible');
        this.sidebarVisible = !this.sidebarVisible;
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

  ngOnDestroy() {
    // delete el listener al destruir el componente
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
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

  onValChange(item: any) {
    if (this.darkMode) {
      if (item === 'sunny') {
         this.darkModeService .toggleDarkTheme();
      }
    } else {
        this.darkModeService .toggleDarkTheme();
    }
  }

}
