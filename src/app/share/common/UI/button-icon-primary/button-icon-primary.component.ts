import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-button-icon-primary',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatButton, MatIcon],
  templateUrl: './button-icon-primary.component.html',
  styleUrl: './button-icon-primary.component.scss'
})
export class ButtonIconPrimaryComponent {

  @Input() iconText: string = '';
  @Input() buttonText: string = '';
  @Input() buttonDisabled = false;
  @Output() clicked = new EventEmitter();

  onClicked() {
    this.clicked.emit();
  }

  get buttonIsDisabled() {
    return this.buttonDisabled;
  }

}
