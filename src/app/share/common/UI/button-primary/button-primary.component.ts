import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { StyleManager } from '../../../services/style-manager.service';
import { FormGroup } from '@angular/forms';
import { NavigationService } from '../../../../navigation/shared/services/navigation.service';
import { Observable } from 'rxjs';
//import { FacturasService } from '../../../../../facturas/facturas.service';

@Component({
  selector: 'app-button-primary',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './button-primary.component.html',
  styleUrl: './button-primary.component.scss'
})
export class ButtonPrimaryComponent implements OnInit {

  @Input() fg: FormGroup | undefined;
  @Input() buttonText: string = 'Guardar'
  @Output() addEdit = new EventEmitter();

  darkMode = false;

  constructor(
    private darkModeService: StyleManager,
    private navigationSrv: NavigationService,
    //private facturasSrv: FacturasService
  ) {}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  onSubmit() {
    this.addEdit.emit();
  }

  get buttonIsDisabled() {
    return !this.fg!.valid;
  }

}
