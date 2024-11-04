import { AfterViewInit, Component, HostListener, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../../../navigation/shared/services/navigation.service';
import { ButtonIconPrimaryComponent } from '../button-icon-primary/button-icon-primary.component';
import { StyleManager } from '../../../services/style-manager.service';
import { ButtonAddComponent } from '../button-add/button-add.component';
import { PdfGeneratorComponent } from '../export/pdf-generator/pdf-generator.component';
import { XlsGeneratorComponent } from '../export/xls-generator/xls-generator.component';
import { WindowService } from '../../../services/window.service';
import { ModalMenuComponent } from "../modal-menu/modal-menu.component";
import { MatTableMobileComponent } from '../mat-table-mobile/mat-table-mobile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule, MatIcon,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    ButtonIconPrimaryComponent,
    ButtonAddComponent,
    PdfGeneratorComponent,
    XlsGeneratorComponent,
    ModalMenuComponent,
    MatTableMobileComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TableListComponent implements OnInit {

  @Input() dataInput: any;
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() editRowNueva = new EventEmitter();
  @Output() addRow = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSourceShow = new MatTableDataSource<any>();

  darkMode = false;
  columns: any;
  displayedColumns: string[] = [];
  isMobile = false;
  isTablet = false;
  isPC = true;
  fg: FormGroup;

  constructor(
    private darkModeService: StyleManager,
    private navigationSrv: NavigationService,
    private translate: TranslateService,
    private windowService: WindowService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ){
    this.darkModeService.darkMode$.subscribe((dark: boolean) => {
      this.darkMode = dark;
    });
    this.isMobile = windowService.isDeviceMobile;
    this.isTablet = windowService.isDeviceTablet;
    this.isPC = windowService.isDevicePC;
    this.fg = this.fb.group({
      filter: ['']
    });
    this.fg.controls['filter'].valueChanges.subscribe(f=> {
      this.dataSourceShow = this.filterData(this.dataInput, f);
    });
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.isPC = this.windowService.isDevicePC;
      this.isTablet = this.windowService.isDeviceTablet;
      this.isMobile = this.windowService.isDeviceMobile;
  }

  ngOnInit(): void {
    this.displayedColumns = Object.keys(this.dataInput.data[0]);
    this.dataSourceShow.data = this.dataInput.data;
  }

  ngAfterViewInit(): void {

    //this.table.dataSource = this.dataSourceShow.data;
    this.dataSourceShow.sort = this.sort;
    this.dataSourceShow.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  filterData(array:any, searchTerm:string) {
    return array.filter((item:any) => {
      // Convertir el término de búsqueda a minúsculas
      const lowerCaseTerm = searchTerm.toLowerCase();
      // Comprobar si el término de búsqueda está en algún campo del objeto
      return Object.values(item).some(value =>
        String(value).toLowerCase().includes(lowerCaseTerm)
      );
    });
  }

  editar(row:any) {
    this.editRow.emit(row);
  }

  editarNueva(row:any) {
    this.editRowNueva.emit(row);
  }

  applyFilter(event:any) {
    debugger;
  }

  eliminar(id: number) {
    Swal.fire({
      title: this.translate.instant('confirm'),
      text: this.translate.currentLang === 'es' ? 'Desea continuar?' : 'Do you want to continue',
      icon: 'question',
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
      cancelButtonText: this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel',
      background: this.darkMode ? '#444' : '#fff',
      color: this.darkMode ? '#fff' : '#000',
    })
    this.deleteRow.emit(id);
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.addRow.emit(row);
  }

}
