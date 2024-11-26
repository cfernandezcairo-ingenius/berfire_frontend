import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { NavigationService } from '../../../../navigation/shared/services/navigation.service';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss'
})
export class ButtonPrimaryComponent {

  @Input() fg: FormGroup | undefined;
  @Input() buttonText: string = 'Guardar'
  @Output() addEdit = new EventEmitter();

  darkMode = false;

  constructor(
    private readonly navigationSrv: NavigationService,
  ) {}

  onSubmit() {
    this.addEdit.emit();
  }

  get buttonIsDisabled() {
    return !this.fg!.valid;
  }

}
