import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import {  MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationService } from '../shared/services/navigation.service';
import { SidebarService } from '../side-bar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

/** @title Responsive sidenav */
@Component({
  selector: 'app-sidenav-responsive',
  standalone: true,
  imports: [MatIconModule, MatSidenavContainer, MatSidenav, MatListModule, MatExpansionModule, MatCheckboxModule, MatSidenavContent , CommonModule, TranslateModule],
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class SidenavResponsiveExample implements OnDestroy {

  showMenuL = true;
  menu: NavItem [] = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private readonly navigationService: NavigationService,
    private readonly sidebarService: SidebarService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Cambia la lógica según tus rutas
        this.showMenuL = !this.router.url.includes('/invoice/edit/new');
      }
    });
    this.translate.onLangChange.subscribe(ch=> {
      this.updateMenuItems();
    })

  }

  updateMenuItems() {
    this.menu = [
      {
        displayName: this.translate.instant('menu.clients'),
        iconName: 'person',
        route: 'clients',
      },
      {
        displayName: this.translate.instant('menu.administration'),
        iconName: 'menu',
        route: '',
        children:[
          {displayName: this.translate.instant('menu.budgets'), iconName: '', route: 'budgets'},
          {displayName: this.translate.instant('menu.delivery-note'), iconName: '', route: 'delivery-note/list'},
          {displayName:  this.translate.instant('menu.invoice'), iconName: '', route: 'invoice/list'},
          {displayName: this.translate.instant('menu.expirations'), iconName: '', route: 'expirations'},
          {displayName: this.translate.instant('menu.corrective-budgets'), iconName: '', route: 'corrective-budgets'},
          {displayName: this.translate.instant('menu.handle-rectification'), iconName: '', route: 'handle-rectification'},
          {displayName: this.translate.instant('menu.reports'), iconName: 'menu', route: '' ,children: [
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
            iconName: 'menu',
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
        iconName: 'menu',
        children: [
          {displayName: 'Proveedores', iconName: '', route: ''},
          {displayName: 'Facturación de Proveedores', iconName: 'menu', route: '', children: [
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
        iconName: 'menu',
        children: [
          {displayName: 'Almacenes', iconName: '', route: ''},
          {displayName: 'Categorías', iconName: '', route: ''},
          {displayName: 'Subcategorías', iconName: '', route: ''},
          {displayName: 'Material en espera', iconName: '', route: ''}
        ],
      },
      {
        displayName: 'Trabajos',
        iconName: 'menu',
        children: [
          {displayName: 'Próximas revisiones', iconName: 'menu', route: '', children: [
            {displayName: 'Próximas revisiones RIPCI', iconName: '', route: ''},
            {displayName: 'Próximas revisiones Seguridad', iconName: '', route: ''},
          ]},
          {displayName: 'Revisiones planificadas', iconName: '', route: ''},
          {displayName: 'Calendario de ejecución', iconName: '', route: ''},
          {displayName: 'últimas revisiones', iconName: 'menu', route: '', children: [
            {displayName: 'últimas revisiones RIPCI', iconName: '', route: ''},
            {displayName: 'últimas revisiones Seguridad', iconName: '', route: ''},
          ]},
        ],
      },
      {
        displayName: this.translate.instant('menu.technicals'),iconName: '', route: 'technicals/list'
      },
      {
        displayName: 'Proyectos',
        iconName: '',
      },
      {
        displayName: 'Documentos',
        iconName: '',
      },
      {displayName: 'Informes',iconName: 'menu',children: [
        {displayName: 'Informes de trabajos', iconName:'menu', children: [
          {displayName: 'Tareas Asignadas',iconName: ''},
          {displayName: 'Incidencias',iconName: ''},
          {displayName: 'Confirmaciones de Tareas',iconName: ''},
          {displayName: 'Gráficos de Productividad',iconName: ''},
        ]},
        {displayName: 'Informes de periodicidad', iconName:'menu', children: [
          {displayName: 'Gráficos de Periodicidades',iconName: ''},
          {displayName: 'Cuotas',iconName: ''},
          {displayName: 'Gráficos mensuales',iconName: ''},
        ]},
        {displayName: 'Mostrar Informes de clientes', iconName:'menu', children: [
          {displayName: 'Márgenes de beneficio',iconName: ''},
          {displayName: 'Servicios ofrecidos',iconName: ''},
          {displayName: 'Rentabilidad de los clientes',iconName: ''},
          {displayName: 'Programación de actividades con clientes',iconName: ''},
          {displayName: 'Facturas de clientes',iconName: ''},
          {displayName: 'Facturación agrupada',iconName: ''},
          {displayName: 'Presupuestos de clientes',iconName: ''},
        ]},
        {displayName: 'Mostrar Informes de equipos', iconName:'menu', children: [
          {displayName: 'Equipos',iconName: ''},
          {displayName: 'Historial de un equipo',iconName: ''}
        ]},
      ]
      },
      {displayName: 'Gestionar la configuración',iconName: 'menu',children: [
        {displayName: 'Datos de la Empresa',iconName: ''},
        {displayName: 'Usuarios',iconName: ''},
        {displayName: this.translate.instant('menu.prTypes'),iconName: '', route: 'prTypes/list'},
        {displayName: this.translate.instant('menu.manufacturers'),iconName: '', route: 'manufacturers/list'},
        {displayName: this.translate.instant('menu.documents-templates'),iconName: '', route: 'documents-templates/list'},
      ]},
      {displayName: this.translate.instant('menu.advancedSettings'),iconName: 'menu',children: [
        {displayName: this.translate.instant('menu.banks'),iconName: '', route: 'banks/list'},
        {displayName: this.translate.instant('menu.delivery-note-states'),iconName: '', route: 'delivery-note-states/list'},
        {displayName: this.translate.instant('menu.invoice-status'),iconName: '', route: 'invoice-status/list'},
        {displayName: this.translate.instant('menu.statement-order'),iconName: '', route: 'statement-order/list'},
        {displayName: this.translate.instant('menu.request-status'),iconName: '', route: 'request-status/list'},
        {displayName: this.translate.instant('menu.states-parties-review') ,iconName: '', route: 'states-parties-review/list'},
        {displayName: this.translate.instant('menu.work-status'),iconName: '', route: 'work-status/list'},
        {displayName: this.translate.instant('menu.payment-forms'),iconName: '', route: 'payment-forms/list'},
        {displayName: this.translate.instant('menu.taxes') ,iconName: '', route: 'taxes/list'},
        {displayName: 'Logs',iconName: ''},
        {displayName: this.translate.instant('menu.unsubscribe-equipment-reasons') ,iconName: '', route: 'unsubscribe-reasons/list'},
        {displayName: this.translate.instant('menu.populations'),iconName: '', route: 'populations/list'},
        {displayName: this.translate.instant('menu.pvpRates') ,iconName: '', route: 'pvp-rates/list'},
        {displayName: this.translate.instant('menu.clients-types'),iconName: '', route: 'clients-types/list'},
        //contractsTypes
        {displayName: this.translate.instant('menu.contracts-types'),iconName: '', route: 'contracts-types/list'},
        {displayName: 'Roles',iconName: ''}
      ]},
      {displayName: 'Gestión Operativa',iconName: 'menu',children: [
        {displayName: 'Familias',iconName: ''},
        {displayName: 'Productos',iconName: ''},
        {displayName: 'Servicios',iconName: ''}
      ]
      }
    ];
  }

  showMenu() {
    this.sidebarService.toggleVisible();
  }

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigateTo(item: any) {
    this.sidebarService.setVisible(false);
    this.navigationService.NavigateTo(item.route);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

