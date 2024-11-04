import {SelectionModel} from '@angular/cdk/collections';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import {  MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationService } from '../shared/services/navigation.service';
import { SidebarService } from '../side-bar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav-responsive',
  standalone: true,
  imports: [MatToolbar, MatIconModule, MatSidenavContainer, MatSidenav, MatListModule,MatTableModule, MatExpansionModule , MatCheckboxModule, MatSidenavContent , CommonModule],
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavResponsiveExample implements OnDestroy {
  //displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //selection = new SelectionModel<PeriodicElement>(true, []);
  showMenuL = true;


 /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    //const numSelected = this.selection.selected.length;
    //const numRows = this.dataSource.data.length;
    //return numSelected === numRows;
    }

      /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: PeriodicElement): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  menu: NavItem [] = [
        {
          displayName: 'Clientes',
          iconName: 'person',
          route: 'clients',
        },
        {
          displayName: 'Administración',
          iconName: 'ballot',
          route: '',
          children:[
            {displayName: 'Presupuestos', iconName: '', route: 'budgets'},
            {displayName: 'Albaranes', iconName: '', route: 'delivery-notes/list'},
            {displayName: 'Facturas', iconName: '', route: 'invoice/list'},
            {displayName: 'Vencimientos', iconName: '', route: 'expirations'},
            {displayName: 'Presupuestos correctivos', iconName: '', route: 'corrective-budgets'},
            {displayName: 'Gestionar rectificativas', iconName: '', route: 'handle-rectification'},
            {displayName: 'Reportes', iconName: '', route: '' ,children: [
              {displayName: 'Reporte de Facturas', iconName: '', route: 'invoice-report'},
              {displayName: 'Reporte de Albaranes', iconName: '', route: ''},
            ]},
            {
              displayName: 'Facturas de gastos',
              iconName: '',
            },
            {
              displayName: 'Subidas de cuotas',
              iconName: '',
            },
            {
              displayName: 'Modelos 347',
              iconName: '',
            },
            {
              displayName: 'Importes facturados',
              iconName: '',
            },
            {
              displayName: 'Estimación de cobros periódicos',
              iconName: '',
            },
            {
              displayName: 'Reportes de facturación',
              iconName: '',
              children: [
                {displayName: 'Por categorías', iconName: '', route: ''},
                {displayName: 'Por operaciones', iconName: '', route: ''},
                {displayName: 'Deuda por cliente', iconName: '', route: ''},
                {displayName: 'Facturación mensual', iconName: '', route: ''},
              ]
            }
          ]
        },
        {
          displayName: 'Facturación de Proveedores',
          iconName: '',
          children: [
            {displayName: 'Proveedores', iconName: '', route: ''},
            {displayName: 'Facturación de Proveedores', iconName: '', route: '', children: [
              {displayName: 'Facturas de Proveedores', iconName: '', route: ''},
              {displayName: 'Rectificativas de Proveedores', iconName: '', route: ''},
            ]},
            {displayName: 'Vencimientos de Proveedores', iconName: '', route: ''},
            {displayName: 'Remesa', iconName: '', route: ''},
            {displayName: 'Mostrar deuda por Proveedor', iconName: '', route: ''},
            {displayName: 'Modelos 347', iconName: '', route: ''},
            {displayName: 'Propuestas de Compra', iconName: '', route: ''},
            {displayName: 'Remesas', iconName: '', route: ''},
            {displayName: 'Albaranes de Entrega', iconName: '', route: ''},
            {displayName: 'Pedidos', iconName: '', route: ''},
          ],
        },
        {
          displayName: 'Almacén',
          iconName: '',
          children: [
            {displayName: 'Almacenes', iconName: '', route: ''},
            {displayName: 'Categorías', iconName: '', route: ''},
            {displayName: 'Subcategorías', iconName: '', route: ''},
            {displayName: 'Material en espera', iconName: '', route: ''}
          ],
        },
        {
          displayName: 'Trabajos',
          iconName: '',
          children: [
            {displayName: 'Próximas revisiones', iconName: '', route: '', children: [
              {displayName: 'Próximas revisiones RIPCI', iconName: '', route: ''},
              {displayName: 'Próximas revisiones Seguridad', iconName: '', route: ''},
            ]},
            {displayName: 'Revisiones planificadas', iconName: '', route: ''},
            {displayName: 'Calendario de ejecución', iconName: '', route: ''},
            {displayName: 'últimas revisiones', iconName: '', route: '', children: [
              {displayName: 'últimas revisiones RIPCI', iconName: '', route: ''},
              {displayName: 'últimas revisiones Seguridad', iconName: '', route: ''},
            ]},
          ],
        },
        {
          displayName: 'Técnicos',
          iconName: '',
        },
        {
          displayName: 'Proyectos',
          iconName: '',
        },
        {
          displayName: 'Documentos',
          iconName: '',
        },
        {displayName: 'Informes',iconName: '',children: [
          {displayName: 'Informes de trabajos', iconName:'', children: [
            {displayName: 'Tareas Asignadas',iconName: ''},
            {displayName: 'Incidencias',iconName: ''},
            {displayName: 'Confirmaciones de Tareas',iconName: ''},
            {displayName: 'Gráficos de Productividad',iconName: ''},
          ]},
          {displayName: 'Informes de periodicidad', iconName:'', children: [
            {displayName: 'Gráficos de Periodicidades',iconName: ''},
            {displayName: 'Cuotas',iconName: ''},
            {displayName: 'Gráficos mensuales',iconName: ''},
          ]},
          {displayName: 'Mostrar Informes de clientes', iconName:'', children: [
            {displayName: 'Márgenes de beneficio',iconName: ''},
            {displayName: 'Servicios ofrecidos',iconName: ''},
            {displayName: 'Rentabilidad de los clientes',iconName: ''},
            {displayName: 'Programación de actividades con clientes',iconName: ''},
            {displayName: 'Facturas de clientes',iconName: ''},
            {displayName: 'Facturación agrupada',iconName: ''},
            {displayName: 'Presupuestos de clientes',iconName: ''},
          ]},
          {displayName: 'Mostrar Informes de equipos', iconName:'', children: [
            {displayName: 'Equipos',iconName: ''},
            {displayName: 'Historial de un equipo',iconName: ''}
          ]},
        ]
        },
        {displayName: 'Gestionar la configuración',iconName: '',children: [
          {displayName: 'Datos de la Empresa',iconName: ''},
          {displayName: 'Usuarios',iconName: ''},
          {displayName: 'Tipos de partes de revisión',iconName: ''},
          {displayName: 'Fabricantes',iconName: ''},
          {displayName: 'Plantillas de documentos',iconName: ''}
        ]},
        {displayName: 'Ajustes Avanzados',iconName: '',children: [
          {displayName: 'Bancos',iconName: ''},
          {displayName: 'Albaranes de entrega',iconName: '', route: 'dispatch-notes/list'},
          {displayName: 'Estados de las facturas',iconName: ''},
          {displayName: 'Estados de las órdenes de trabajo',iconName: ''},
          {displayName: 'Estados de los pedidos',iconName: ''},
          {displayName: 'Estados de los partes de revisión',iconName: ''},
          {displayName: 'Estados del trabajador',iconName: ''},
          {displayName: 'Formas de pago',iconName: ''},
          {displayName: 'Impuestos',iconName: ''},
          {displayName: 'Logs',iconName: ''},
          {displayName: 'Motivos de baja de equipamiento',iconName: ''},
          {displayName: 'Poblaciones',iconName: ''},
          {displayName: 'Tarifas PVP',iconName: ''},
          {displayName: 'Tipos de cliente',iconName: ''},
          {displayName: 'Tipos de contrato',iconName: ''},
          {displayName: 'Roles',iconName: ''}
        ]},
        {displayName: 'Gestión Operativa',iconName: '',children: [
          {displayName: 'Familias',iconName: ''},
          {displayName: 'Productos',iconName: ''},
          {displayName: 'Servicios',iconName: ''}
        ]
        }
      ];
  mobileQuery: MediaQueryList;
  // menu = [
  //   {
  //     displayName: 'Inicio',
  //     iconName: 'home',
  //     route: '/home',
  //     children: []
  //   },
  //   {
  //     displayName: 'Configuración',
  //     iconName: 'settings',
  //     route: '/settings',
  //     children: [
  //       {
  //         displayName: 'Perfil',
  //         iconName: 'person',
  //         route: '/settings/profile',
  //         children: [
  //           { displayName: 'Editar', iconName: 'edit', route: '/settings/profile/edit' },
  //           { displayName: 'Ver', iconName: 'visibility', route: '/settings/profile/view' }
  //         ]
  //       },
  //       {
  //         displayName: 'Seguridad',
  //         iconName: 'lock',
  //         route: '/settings/security',
  //         children: []
  //       }
  //     ]
  //   }
  // ];

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private navigationService: NavigationService,
    private sidebarService: SidebarService,
    private authService: AuthService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showMenuL = !this.router.url.includes('/invoice/edit/new');
      }
    });
  }

  showMenu() {
    this.sidebarService.toggleVisible();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigateTo(item: any) {
    this.sidebarService.setVisible(false);
    this.navigationService.NavigateTo(item.route);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

