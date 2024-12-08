import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-documents',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './text-documents.component.html',
  styleUrl: './text-documents.component.scss'
})
export class TextDocumentsComponent {
  @Input() fgTextDocuments: any;
  @Input() modelTextDocuments:any;

  constructor(private readonly fb: FormBuilder) {

  }

}
