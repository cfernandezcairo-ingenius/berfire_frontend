import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NavigationService } from '../../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-button-secondary',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './button-secondary.component.html',
  styleUrl: './button-secondary.component.scss'
})
export class ButtonSecondaryComponent  {

  @Output() cancel = new EventEmitter();

  constructor(private navigationSrv: NavigationService) {}

  onCancel() {
    this.cancel.emit();
  }
}
