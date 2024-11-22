import { CommonModule } from '@angular/common';
import { Component, Input, HostListener } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardActions } from '@angular/material/card';
import { StyleManager } from '../../../services/style-manager.service';
import { WindowService } from '../../../services/window.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-md-card',
  standalone: true,
  imports: [MatCard, MatCardActions, FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatIcon ],
  templateUrl: './md-card.component.html',
  styleUrl: './md-card.component.scss'
})
export class MDCardComponent  {

  @Input() title: string = '';
  @Input() valor:string = '';
  @Input() descripcion:string = '';
  darkMode = false;
  isMobile = false;
  isTablet = false;
  isPC = true;


  constructor (private readonly darkModeService:StyleManager, private readonly windowService: WindowService) {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
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

}
