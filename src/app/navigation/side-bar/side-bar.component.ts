import { MenuItemsENG } from '../shared/models/menu-items-en';
import { MenuItems } from '../shared/models/menu-items-es';
import { Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SidebarService } from './sidebar.service';
import { SidenavComponent } from "../sidenav/sidenav.component";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, SidenavComponent],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  providers: [TranslateService]
})
export class SideBarComponent {

  @Output() showCalendar = new EventEmitter<boolean>();

  Menu = MenuItems;

  constructor(
    private translate: TranslateService, private sideBarsrv: SidebarService
  ) {
    this.translate.onLangChange.subscribe(lch => {
      if (this.translate.currentLang === 'en') {
        this.Menu = MenuItemsENG;
      } else {
        this.Menu = MenuItems;
      }
    });


  }

  switchCollapsed(i: number) {
    this.Menu[i].collapsed = !this.Menu[i].collapsed;
  }

  setMenuHidden() {
    this.sideBarsrv.setVisible(false);
  }

}
