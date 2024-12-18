import { Component, HostListener, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectorRef, ElementRef, OnChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { WindowService } from '../../../services/window.service';
import { ModalMenuComponent } from "../modal-menu/modal-menu.component";
import { MatTableMobileComponent } from '../mat-table-mobile/mat-table-mobile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IDisplayedLabels } from '../../../../navigation/shared/models/app-models';
import { MatSelectModule } from '@angular/material/select';

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
    ModalMenuComponent,
    MatTableMobileComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatSelectModule
],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [TranslateService]
})
export class TableListComponent implements OnInit, OnChanges {

  @Input() dataInput: { data: any[]; } | undefined;
  @Input() displayedLabels: IDisplayedLabels[] = [];
  @Input() titleMobileList: string = '';
  @Input() fg:FormGroup = new FormGroup({});
  @Output() deleteRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() editRowNueva = new EventEmitter();
  @Output() addRow = new EventEmitter();
  @Output() searchData = new EventEmitter();
  @Output() cleanSearchData = new EventEmitter();
  @Output() filter = new EventEmitter();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild('movible') movible!: ElementRef;
  private offsetX: number = 0;
  private offsetY: number = 0;
  // Almacena las referencias a las funciones
  private readonly mouseMoveHandler?: ((e: MouseEvent) => void);
  private readonly mouseUpHandler?: (() => void);

  dataSourceShow = new MatTableDataSource<any>();

  columns: any;
  displayedColumns: string[] = [];
  isMobile = false;
  isTablet = false;
  isPC = true;

  constructor(
    private readonly translate: TranslateService,
    private readonly windowService: WindowService,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ){
    this.setLayout();
    this.mouseMoveHandler = this.onMouseMove.bind(this);
    this.mouseUpHandler = this.onMouseUp.bind(this);
   }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.setLayout();
  }

  ngOnInit(): void {
    this.displayedColumns = Object.keys(this.dataInput!.data[0]);
    this.dataSourceShow.data = this.dataInput!.data;
    this.displayedColumns.forEach(d => {
      this.fg.addControl(d, this.fb.control(''));
    });
  }

  setLayout() {
    this.isPC = this.windowService.isDevicePC;
    this.isTablet = this.windowService.isDeviceTablet;
    this.isMobile = this.windowService.isDeviceMobile;
  }

  ngOnChanges(): void {

    this.dataSourceShow.data = this.dataInput!.data;
  }

  ngAfterViewInit(): void {
    this.dataSourceShow.sort = this.sort;
    this.dataSourceShow.paginator = this.paginator;
    this.cdr.detectChanges();
    //Boton Add
    if (this.movible) {
      this.movible.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    } else {
      console.log('El elemento movible no se encontró');
    }
  }

  private onMouseDown(e: MouseEvent) {
    this.offsetX = e.clientX - this.movible.nativeElement.getBoundingClientRect().left;
    this.offsetY = e.clientY - this.movible.nativeElement.getBoundingClientRect().top;

    document.addEventListener('mousemove', this.mouseMoveHandler!);
    document.addEventListener('mouseup', this.mouseUpHandler!);
  }

  private onMouseMove(e: MouseEvent) {
    this.movible.nativeElement.style.left = e.clientX - this.offsetX + 'px';
    this.movible.nativeElement.style.top = e.clientY - this.offsetY + 'px';
  }

  private onMouseUp() {
    document.removeEventListener('mousemove', this.mouseMoveHandler!);
    document.removeEventListener('mouseup', this.mouseMoveHandler!);
  }

  edit(row:any) {
    this.editRow.emit(row);
  }

  editNew(row:any) {
    this.editRowNueva.emit(row);
  }

  search() {
    this.searchData.emit(this.fg.value);
  }

  delete(id: number) {
    Swal.fire({
      title: this.translate.instant('confirm'),
      text: this.translate.currentLang === 'es' ? 'Desea continuar?' : 'Do you want to continue',
      icon: 'question',
      showConfirmButton:true,
      showCancelButton: true,
      confirmButtonText: this.translate.currentLang === 'es' ? 'Aceptar' : 'Accept',
      cancelButtonText: this.translate.currentLang === 'es' ? 'Cancelar' : 'Cancel',
    })
    this.deleteRow.emit(id);
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.addRow.emit(row);
  }


  cleanSearch() {
    this.cleanSearchData.emit();
  }

  goToFirstPage() {
    this.paginator.firstPage();
  }

  goToLastPage() {
    this.paginator.lastPage();
  }

  getChecked(value: any) {
    return value === true;
  }

}
