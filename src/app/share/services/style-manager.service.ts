import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class StyleManager {

  isDark: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  cookieValue = '';
  fechaExpiracion: Date = new Date();

  constructor(private readonly cookieService: CookieService) {
    this.cookieValue = this.cookieService.get('darkMode');
    if (this.cookieValue.length === 0) {
      this.fechaExpiracion.setTime(this.fechaExpiracion.getTime() + (10 *365 * 24 * 60 * 60 * 1000));//10 años
      this.cookieService.set('darkMode', 'false', {expires: this.fechaExpiracion});
      this.setDarkTheme(false);
    } else {
      this.fechaExpiracion.setTime(this.fechaExpiracion.getTime() + (10 *365 * 24 * 60 * 60 * 1000));//10 años
      this.setDarkTheme(this.cookieValue === 'false' ? false : true);
    }
  }

  get darkMode$(): Observable<boolean> {
    return this.isDark.asObservable();
  }

  toggleDarkTheme() {
    if (this.isDark.getValue()) {
      this.updateBodyClassList(false);
    } else {
      // const href = 'dark-theme.css';
      // getLinkElementForKey('dark-theme').setAttribute('href', href);
      this.updateBodyClassList(true);
    }
    this.isDark.next(!this.isDark.getValue());
  }

  updateBodyClassList(themeDark: boolean) {
    if (themeDark === true) {
      document.body.classList.add('dark-theme');
      document.body.classList.add('darkMode');
      document.body.classList.remove('lightMode');
      this.fechaExpiracion.setTime(this.fechaExpiracion.getTime() + (10 *365 * 24 * 60 * 60 * 1000));//10 años
      this.cookieService.set('darkMode', 'true', {expires: this.fechaExpiracion});
      this.cookieValue = this.cookieService.get('darkMode');
    } else {
      document.body.classList.add('lightMode');
      document.body.classList.remove('dark-theme');
      document.body.classList.remove('darkMode');
      this.fechaExpiracion.setTime(this.fechaExpiracion.getTime() + (10 *365 * 24 * 60 * 60 * 1000));//10 años
      this.cookieService.set('darkMode', 'false', {expires: this.fechaExpiracion});
      this.cookieValue = this.cookieService.get('darkMode');
    }
  }

  setDarkTheme(themeDark: boolean) {
    this.updateBodyClassList(themeDark);
    this.isDark.next(themeDark);
  }

  removeStyle(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(
    `link[rel="stylesheet"].${getClassNameForKey(key)}`
  );
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `style-manager-${key}`;
}
