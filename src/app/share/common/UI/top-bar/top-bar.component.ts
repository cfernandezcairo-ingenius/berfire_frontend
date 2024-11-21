import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StyleManager } from '../../../services/style-manager.service';
import { AuthService } from '../../../../auth/auth.service';
import { WindowService } from '../../../services/window.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit {

  @Output() darkModeChange = new EventEmitter();
  @Output() languageChange = new EventEmitter();
  @Output() menuChange = new EventEmitter();

  isMobile = false;
  isTablet = false;
  isPC = true;

  darkMode = false;

  constructor(
    public translate: TranslateService,
    private darkModeService: StyleManager,
    public authService: AuthService,
    private windowService: WindowService,
  ) {
    this.isMobile = windowService.isDeviceMobile;
    this.isTablet = windowService.isDeviceTablet;
    this.isPC = windowService.isDevicePC;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.isPC = this.windowService.isDevicePC;
      this.isTablet = this.windowService.isDeviceTablet;
      this.isMobile = this.windowService.isDeviceMobile;
  }

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  onValChange(item: any) {
    this.darkModeChange.emit(item);
  }

  changeLanguage(lang: string) {
    this.languageChange.emit(lang)
  }

  showMenu() {
    this.menuChange.emit();
  }
  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
