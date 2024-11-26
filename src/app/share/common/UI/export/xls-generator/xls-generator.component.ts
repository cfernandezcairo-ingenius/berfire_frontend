import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatIconModule } from '@angular/material/icon';
import { ButtonIconPrimaryComponent } from '../../button-icon-primary/button-icon-primary.component';

@Component({
  selector: 'app-xls-generator',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, TranslateModule, ButtonIconPrimaryComponent],
  templateUrl: './xls-generator.component.html',
  styleUrl: './xls-generator.component.scss',
  providers: [TranslateService]
})
export class XlsGeneratorComponent {

  @Input() dataSource: any = [];
  @Input() header: any = [];
  darkMode = false;

  constructor(
    private translate: TranslateService
  ){
  }

  exportAsExcel()
  {
    const workSheet = XLSX.utils.json_to_sheet(this.dataSource, {header:this.header});
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'SheetName');
    XLSX.writeFile(workBook, 'Facturas.xlsx');

  }

}
