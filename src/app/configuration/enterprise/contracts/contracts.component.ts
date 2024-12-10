import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [MatTabsModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.scss'
})
export class ContractsComponent {

  @Input() fgContracts: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.fgContracts = this.fb.group({
      security: [],
      ripci: []
    });
  }

}
