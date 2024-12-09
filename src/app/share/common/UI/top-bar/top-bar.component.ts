import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output, Input } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../../services/window.service';
import { MsalService } from '@azure/msal-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButtonModule, MatMenuModule, MatIcon],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  providers: [TranslateService]
})
export class TopBarComponent {

  @Input() loginDisplay = false;
  @Output() loginRequest = new EventEmitter();
  @Output() logoutRequest = new EventEmitter();
  @Output() editProfileRequest = new EventEmitter();
  @Output() languageChange = new EventEmitter();
  @Output() menuChange = new EventEmitter();


  isMobile = false;
  isTablet = false;
  isPC = true;

  constructor(
    public translate: TranslateService,
    public authService: MsalService,
    private readonly windowService: WindowService,
  ) {
    this.setLayout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.setLayout();
  }

  setLayout() {
    this.isPC = this.windowService.isDevicePC;
    this.isTablet = this.windowService.isDeviceTablet;
    this.isMobile = this.windowService.isDeviceMobile;
  }

  changeLanguage(lang: string) {
    this.languageChange.emit(lang)
  }

  showMenu() {
    this.menuChange.emit();
  }
  get isAuthenticated() {
    return true;
  }

  editProfile() {
    this.editProfileRequest.emit();
  }

  login() {
    this.loginRequest.emit();
  }

  logout() {
    this.logoutRequest.emit();
  }

  get AuthenticatedUser() {
    const accounts = this.authService.instance.getAllAccounts();
    return accounts.length > 0 ? accounts[0].username : null;
  }

}
