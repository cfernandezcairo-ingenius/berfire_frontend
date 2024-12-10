import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-rich-text-modal',
  standalone: true,
  imports: [QuillModule, ReactiveFormsModule, FormsModule],
  templateUrl: './rich-text-modal.component.html',
  styleUrls: ['./rich-text-modal.component.css']
})
export class RichTextModalComponent {
  content: string = '';
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<string>();

  close() {
    this.onClose.emit();
  }

  save() {
    this.onSave.emit(this.content);
  }
}

