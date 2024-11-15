import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { StyleManager } from '../../../services/style-manager.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-add',
  standalone: true,
  imports: [MatIcon, CommonModule],
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.scss'
})
export class ButtonAddComponent implements OnInit {

  @Output() newItem = new EventEmitter();
  darkMode = false;

  constructor( private readonly darkModeService: StyleManager){}

  ngOnInit(): void {
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  addItem() {
    this.newItem.emit();
  }

}
