import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-visible-novisible',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './visible-novisible.component.html',
  styleUrl: './visible-novisible.component.scss'
})
export class VisibleNovisibleComponent {

  @Input() show: boolean = false;

  @Output() toggleShowEmitter = new EventEmitter();

  toggleShow() {
    this.toggleShowEmitter.emit();
  }

}
