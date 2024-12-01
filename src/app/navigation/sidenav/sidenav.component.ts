import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationService } from '../shared/services/navigation.service';
import { SidebarService } from '../side-bar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-sidenav-responsive',
  standalone: true,
  imports: [MatIconModule, MatSidenavContainer, MatSidenav, MatListModule, MatExpansionModule, MatCheckboxModule, MatSidenavContent , CommonModule, TranslateModule],
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
  providers: [HttpClient, TranslateService]
})
export class SidenavComponent {

  showMenuL = true;
  menu: NavItem [] = [];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public readonly navigationService: NavigationService,
    private readonly sidebarService: SidebarService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly translate: TranslateService
  ) {
    this.translate.onLangChange.subscribe(ch=> {
      this.updateMenuItems();
    })

  }

  createMenuItem(menu: NavItem) {
    return {
      displayName: this.translate.instant(menu.displayName),
      iconName: menu.iconName,
      route: menu.route,
      children: menu.children
       }
  };

  menuAdministracion() : any {
    return [
      this.createMenuItem({displayName: 'menu.budgets', iconName: '', route: 'budgets'}),
      this.createMenuItem({displayName: 'menu.delivery-note', iconName: '', route: 'delivery-note/list'}),
      this.createMenuItem({displayName: 'menu.invoice', iconName: '', route: 'invoice/list'}),
      this.createMenuItem({displayName: 'menu.expirations', iconName: '', route: 'expirations'}),
      this.createMenuItem({displayName: 'menu.corrective-budgets', iconName: '', route: 'corrective-budgets'}),
      this.createMenuItem({displayName: 'menu.handle-rectification', iconName: '', route: 'handle-rectification'}),
      this.createMenuItem({displayName: 'menu.reports', iconName: 'menu', route: '' ,
        children: [
          this.createMenuItem({displayName: 'Reporte de Facturas', iconName: '', route: 'invoice-report'}),
          this.createMenuItem({displayName: 'Reporte de Albaranes', iconName: '', route: ''}),
        ]
      }),
      this.createMenuItem({ displayName: 'Facturas de gastos', iconName: '',route: '' }),
      this.createMenuItem({ displayName: 'Subidas de cuotas',iconName: '',route: ''}),
      this.createMenuItem({ displayName: 'Modelos 347', iconName: ''}),
      this.createMenuItem({ displayName: 'Importes facturados', iconName: ''}),
      this.createMenuItem({ displayName: 'Estimación de cobros periódicos', iconName: ''}),
      this.createMenuItem({ displayName: 'Reportes de facturación', iconName: 'menu',
        children: [
          this.createMenuItem({displayName: 'Por categorías', iconName: '', route: ''}),
          this.createMenuItem({displayName: 'Por operaciones', iconName: '', route: ''}),
          this.createMenuItem({displayName: 'Deuda por cliente', iconName: '', route: ''}),
          this.createMenuItem({displayName: 'Facturación mensual', iconName: '', route: ''}),
        ]
      })
      ]
  }

  menuFacturacionProveedores() : any {
    return [
      this.createMenuItem({displayName: 'Proveedores', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Facturación de Proveedores', iconName: 'menu', route: '',
      children: [
        this.createMenuItem({displayName: 'Facturas de Proveedores', iconName: '', route: ''}),
        this.createMenuItem({displayName: 'Rectificativas de Proveedores', iconName: '', route: ''}),
      ]
      }),
      this.createMenuItem({displayName: 'Vencimientos de Proveedores', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Remesa', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Mostrar deuda por Proveedor', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Modelos 347', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Propuestas de Compra', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Remesas', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Albaranes de Entrega', iconName: '', route: ''}),
      this.createMenuItem({displayName: 'Pedidos', iconName: '', route: ''})
    ]
  }

  menuAlmacen() : any {
  return [
    this.createMenuItem({displayName: 'Almacenes', iconName: '', route: ''}),
    this.createMenuItem({displayName: 'Categorías', iconName: '', route: ''}),
    this.createMenuItem({displayName: 'Subcategorías', iconName: '', route: ''}),
    this.createMenuItem({displayName: 'Material en espera', iconName: '', route: ''})
  ]
  }

  menuTrabajos() {
    return [
      this.createMenuItem({displayName: 'Próximas revisiones', iconName: 'menu', route: '',
      children: [
        this.createMenuItem({displayName: 'Próximas revisiones RIPCI', iconName: '', route: ''}),
        this.createMenuItem( {displayName: 'Próximas revisiones Seguridad', iconName: '', route: ''}),
      ]
      }),
    this.createMenuItem({displayName: 'Revisiones planificadas', iconName: '', route: ''}),
    this.createMenuItem({displayName: 'Calendario de ejecución', iconName: '', route: ''}),
    this.createMenuItem({displayName: 'últimas revisiones', iconName: 'menu', route: '',
      children: [
        this.createMenuItem({displayName: 'últimas revisiones RIPCI', iconName: '', route: ''}),
        this.createMenuItem({displayName: 'últimas revisiones Seguridad', iconName: '', route: ''}),
      ]
    }),
  ]
  }

  updateMenuItems() {
    this.menu = [
      this.createMenuItem({ displayName: 'menu.clients', iconName: 'person', route: 'clients'}),
      this.createMenuItem({displayName: 'menu.administration', iconName: 'menu', route: '',
        children: this.menuAdministracion()}),
      this.createMenuItem({displayName: 'Facturación de Proveedores',
        iconName: 'menu', children: this.menuFacturacionProveedores()}),
      this.createMenuItem({displayName: 'Almacén', iconName: 'menu',
        children: [
          this.createMenuItem({displayName: 'Almacenes', iconName: '', route: ''}),
          this.createMenuItem({displayName: 'Categorías', iconName: '', route: ''}),
          this.createMenuItem({displayName: 'Subcategorías', iconName: '', route: ''}),
          this.createMenuItem({displayName: 'Material en espera', iconName: '', route: ''})
        ]
      }),
      this.createMenuItem({ displayName: 'Trabajos', iconName: 'menu', children: this.menuTrabajos()}),
      this.createMenuItem({ displayName: 'menu.technicals',iconName: '', route: 'technicals/list'}),
      this.createMenuItem({ displayName: 'Proyectos', iconName: '', }),
      this.createMenuItem({ displayName: 'Documentos', iconName: ''}),
      this.createMenuItem({displayName: 'Informes',iconName: 'menu',
        children: [
          this.createMenuItem({displayName: 'Informes de trabajos', iconName:'menu',
            children: [
              this.createMenuItem({displayName: 'Tareas Asignadas',iconName: ''}),
              this.createMenuItem({displayName: 'Incidencias',iconName: ''}),
              this.createMenuItem({displayName: 'Confirmaciones de Tareas',iconName: ''}),
              this.createMenuItem({displayName: 'Gráficos de Productividad',iconName: ''}),
            ]
      }),
      this.createMenuItem({displayName: 'Informes de periodicidad', iconName:'menu',
        children: [
          this.createMenuItem({displayName: 'Gráficos de Periodicidades',iconName: ''}),
          this.createMenuItem({displayName: 'Cuotas',iconName: ''}),
          this.createMenuItem({displayName: 'Gráficos mensuales',iconName: ''}),
        ]
      }),
      this.createMenuItem({displayName: 'Mostrar Informes de clientes', iconName:'menu',
        children: [
          this.createMenuItem({displayName: 'Márgenes de beneficio',iconName: ''}),
          this.createMenuItem({displayName: 'Servicios ofrecidos',iconName: ''}),
          this.createMenuItem({displayName: 'Rentabilidad de los clientes',iconName: ''}),
          this.createMenuItem({displayName: 'Programación de actividades con clientes',iconName: ''}),
          this.createMenuItem({displayName: 'Facturas de clientes',iconName: ''}),
          this.createMenuItem({displayName: 'Facturación agrupada',iconName: ''}),
          this.createMenuItem({displayName: 'Presupuestos de clientes',iconName: ''}),
        ]
      }),
      this.createMenuItem({displayName: 'Mostrar Informes de equipos', iconName:'menu',
        children: [
          this.createMenuItem({displayName: 'Equipos',iconName: ''}),
          this.createMenuItem({displayName: 'Historial de un equipo',iconName: ''})
        ]
      }),
      ]
      }),
      this.createMenuItem({displayName: 'Gestionar la configuración',iconName: 'menu',
        children: [
          this.createMenuItem({displayName: 'Datos de la Empresa',iconName: ''}),
          this.createMenuItem({displayName: 'Usuarios',iconName: ''}),
          this.createMenuItem({displayName: 'menu.prTypes',iconName: '', route: 'prTypes/list'}),
          this.createMenuItem({displayName: 'menu.prIncidents',iconName: '', route: 'prIncidents/list'}),

          this.createMenuItem({displayName: 'menu.manufacturers',iconName: '', route: 'manufacturers/list'}),
          this.createMenuItem({displayName: 'menu.documents-templates',iconName: '', route: 'documents-templates/list'})
        ]
      }),
      this.createMenuItem({displayName: 'menu.advancedSettings',iconName: 'menu',
        children: [
          this.createMenuItem({displayName: 'menu.banks',iconName: '', route: 'banks/list'}),
          this.createMenuItem({displayName: 'menu.delivery-note-states',iconName: '', route: 'delivery-note-states/list'}),
          this.createMenuItem({displayName: 'menu.invoice-status',iconName: '', route: 'invoice-status/list'}),
          this.createMenuItem({displayName: 'menu.statement-order',iconName: '', route: 'statement-order/list'}),
          this.createMenuItem({displayName: 'menu.request-status',iconName: '', route: 'request-status/list'}),
          this.createMenuItem({displayName: 'menu.states-parties-review' ,iconName: '', route: 'states-parties-review/list'}),
          this.createMenuItem({displayName: 'menu.work-status',iconName: '', route: 'work-status/list'}),
          this.createMenuItem({displayName: 'menu.payment-forms',iconName: '', route: 'payment-forms/list'}),
          this.createMenuItem({displayName: 'menu.taxes',iconName: '', route: 'taxes/list'}),
          this.createMenuItem({displayName: 'Logs',iconName: ''}),
          this.createMenuItem({displayName: 'menu.unsubscribe-equipment-reasons' ,iconName: '', route: 'unsubscribe-reasons/list'}),
          this.createMenuItem({displayName: 'menu.populations',iconName: '', route: 'populations/list'}),
          this.createMenuItem({displayName: 'menu.pvpRates',iconName: '', route: 'pvp-rates/list'}),
          this.createMenuItem({displayName: 'menu.clients-types',iconName: '', route: 'clients-types/list'}),
          this.createMenuItem({displayName: 'menu.contracts-types',iconName: '', route: 'contracts-types/list'}),
          this.createMenuItem({displayName: 'Roles',iconName: ''})
        ]
      }),
      this.createMenuItem({displayName: 'Gestión Operativa',iconName: 'menu',
        children: [
        {displayName: 'Familias',iconName: ''},
        {displayName: 'Productos',iconName: ''},
        {displayName: 'Servicios',iconName: ''}
        ]
      })
    ];
  }

  showMenu() {
    this.sidebarService.toggleVisible();
  }

  navigateTo(item: any) {
    this.sidebarService.setVisible(false);
    this.navigationService.NavigateTo(item.route);
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}

