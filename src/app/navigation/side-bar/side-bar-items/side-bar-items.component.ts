import { MenuItemChildren } from '../../shared/models/menu.model';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../sidebar.service';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar-items',
  standalone: true,
  imports:[CommonModule, MatIconModule, TranslateModule],
  templateUrl: './side-bar-items.component.html',
  styleUrls: ['./side-bar-items.component.scss'],
  providers: [TranslateService]
})
export class SideBarItemsComponent {

  @Input() childrens: MenuItemChildren[] | undefined;

  constructor(
    private _router: Router,
    private _navigationService: NavigationService,
    private sideBarsrv: SidebarService
    ) { }

  navigateTo(url:string) {
    this.sideBarsrv.setVisible(false);
    this._navigationService.NavigateTo(url);
  }
}
