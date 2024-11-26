import { Component, EventEmitter, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-add',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.scss'
})
export class ButtonAddComponent {

  @Output() newItem = new EventEmitter();
  darkMode = false;

  constructor(){}

  addItem() {
    this.newItem.emit();
  }

}
