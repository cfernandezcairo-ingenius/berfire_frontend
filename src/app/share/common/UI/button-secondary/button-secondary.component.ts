import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StyleManager } from '../../../services/style-manager.service';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '../../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.scss'
})
export class ButtonSecondaryComponent implements OnInit {

  @Output() cancel = new EventEmitter();

  darkMode = false;

  constructor(private darkModeService: StyleManager, private navigationSrv: NavigationService) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
