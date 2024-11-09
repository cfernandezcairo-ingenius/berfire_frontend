import { Routes } from '@angular/router';
import { LoginBerfireComponent } from './auth/login-berfire/login-berfire.component';
import { AuthGuard } from './share/common/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacturasListComponent } from './administracion/facturas/facturas-list/facturas-list.component';
import { FacturasAddEditComponent } from './administracion/facturas/facturas-add-edit/facturas-add-edit.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { PresupuestosComponent } from './administracion/presupuestos/presupuestos.component';
import { VencimientosComponent } from './administracion/vencimientos/vencimientos.component';
import { PreupuestosCorrectivoaComponent } from './administracion/preupuestos-correctivoa/preupuestos-correctivoa.component';
import { GestionarRectificativasComponent } from './administracion/gestionar-rectificativas/gestionar-rectificativas.component';
import { ReportesFacturacionComponent } from './administracion/reportes-facturacion/reportes-facturacion.component';
import { AlbaranesListComponent } from './administracion/albaranes/albaranes-list/albaranes-list.component';
import { AlbaranesAddEditComponent } from './administracion/albaranes/albaranes-add-edit/albaranes-add-edit.component';
import { EstadosAlbaranesEntregasListComponent } from './ajustes avanzados/estados-albaranes-entregas/estados-albaranes-entregas-list/estados-albaranes-entregas-list.component';
import { EstadosAlbaranesEntregasAddEditComponent } from './ajustes avanzados/estados-albaranes-entregas/estados-albaranes-entregas-add-edit/estados-albaranes-entregas-add-edit.component';
import { EstadosFacturasListComponent } from './ajustes avanzados/estados-facturas/estados-facturas-list/estados-facturas-list.component';
import { EstadosFacturasAddEditComponent } from './ajustes avanzados/estados-facturas/estados-facturas-add-edit/estados-facturas-add-edit.component';
import { EstadosAlbaranesEntregasDeleteComponent } from './ajustes avanzados/estados-albaranes-entregas/estados-albaranes-entregas-delete/estados-albaranes-entregas-delete.component'
import { EstadosFacturasDeleteComponent } from './ajustes avanzados/estados-facturas/estados-facturas-delete/estados-facturas-delete.component';
import { StatementOrderListComponent } from './ajustes avanzados/statement-order/statement-order-list/statement-order-list.component';
import { StatementOrdersAddEditComponent } from './ajustes avanzados/statement-order/statement-order-add-edit/statement-order-add-edit.component';
import { StatementOrderDeleteComponent } from './ajustes avanzados/statement-order/statement-order-delete/statement-order-delete.component';
import { PaymenFormsListComponent } from './ajustes avanzados/paymentForms/payment-forms-list/payment-forms-list.component';
import { PaymentFormsAddEditComponent } from './ajustes avanzados/paymentForms/payment-forms-add-edit/payment-forms-add-edit.component';
import { RequestStatusListComponent } from './ajustes avanzados/requestStatus/request-status-list/request-status-list.component';
import { RequestStatusAddEditComponent } from './ajustes avanzados/requestStatus/request-status-add-edit/request-status-add-edit.component';
import { RequestStatusDeleteComponent } from './ajustes avanzados/requestStatus/request-status-delete/request-status-delete.component';
import { WorkStatusListComponent } from './ajustes avanzados/workStatus/work-status-list/work-status-list.component';
import { WorkStatusAddEditComponent } from './ajustes avanzados/workStatus/work-status-add-edit/work-status-add-edit.component';
import { WorkStatusDeleteComponent } from './ajustes avanzados/workStatus/work-status-delete/work-status-delete.component';
import { BanksListComponent } from './ajustes avanzados/banks/banks-list/banks-list.component';
import { BanksAddEditComponent } from './ajustes avanzados/banks/banks-add-edit/banks-add-edit.component';
import { BanksDeleteComponent } from './ajustes avanzados/banks/banks-delete/banks-delete.component';

export const routes: Routes = [

  { path: '',redirectTo: "invoice/list", pathMatch: "full" },
  { path: 'login', component: LoginBerfireComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'invoice/list', component: FacturasListComponent, canActivate: [AuthGuard]},
  { path: 'invoice/edit/:id', component: FacturasAddEditComponent, canActivate: [AuthGuard]},
  { path: 'invoice/edit/new/:id', component: FacturasAddEditComponent, canActivate: [AuthGuard]},
  { path: 'clients', component: ClientsListComponent, canActivate: [AuthGuard]},
  { path: 'budgets', component: PresupuestosComponent, canActivate: [AuthGuard]},
  { path: 'delivery-notes/list', component: AlbaranesListComponent, canActivate: [AuthGuard]},
  { path: 'delivery-notes/edit/:id', component: AlbaranesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'dispatch-notes/list', component: EstadosAlbaranesEntregasListComponent, canActivate: [AuthGuard]},
  { path: 'dispatch-notes/edit/:id', component: EstadosAlbaranesEntregasAddEditComponent, canActivate: [AuthGuard]},
  { path: 'dispatch-notes/delete/:id', component: EstadosAlbaranesEntregasDeleteComponent, canActivate: [AuthGuard]},
  { path: 'dispatch-notes/edit/new/:id', component: EstadosAlbaranesEntregasAddEditComponent, canActivate: [AuthGuard]},
  { path: 'expirations', component:VencimientosComponent, canActivate: [AuthGuard]},
  { path: 'corrective-budgets', component: PreupuestosCorrectivoaComponent, canActivate: [AuthGuard]},
  { path: 'handle-rectification', component: GestionarRectificativasComponent, canActivate: [AuthGuard]},
  { path: 'invoice-report', component: ReportesFacturacionComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/list', component: EstadosFacturasListComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/edit/:id', component: EstadosFacturasAddEditComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/delete/:id', component: EstadosFacturasDeleteComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/edit/new/:id', component: EstadosFacturasAddEditComponent, canActivate: [AuthGuard]},
  //statementOrder
  { path: 'statement-order/list', component: StatementOrderListComponent, canActivate: [AuthGuard]},
  { path: 'statement-order/edit/:id', component: StatementOrdersAddEditComponent, canActivate: [AuthGuard]},
  { path: 'statement-order/delete/:id', component: StatementOrderDeleteComponent, canActivate: [AuthGuard]},
  { path: 'statement-order/edit/new/:id', component: StatementOrdersAddEditComponent, canActivate:[AuthGuard]},
  { path: 'payment-forms/list', component: PaymenFormsListComponent, canActivate: [AuthGuard]},
  { path: 'payment-forms/edit/:id', component: PaymentFormsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'payment-forms/delete/:id', component: StatementOrderDeleteComponent, canActivate: [AuthGuard]},
  { path: 'payment-forms/edit/new/:id', component: StatementOrdersAddEditComponent, canActivate: [AuthGuard]},
  { path: 'request-status/list', component: RequestStatusListComponent, canActivate: [AuthGuard]},
  { path: 'request-status/edit/:id', component: RequestStatusAddEditComponent, canActivate: [AuthGuard]},
  { path: 'request-status/delete/:id', component: RequestStatusDeleteComponent, canActivate: [AuthGuard]},
  { path: 'request-status/edit/new/:id', component: RequestStatusAddEditComponent, canActivate: [AuthGuard]},
  { path: 'work-status/list', component: WorkStatusListComponent, canActivate: [AuthGuard]},
  { path: 'work-status/edit/:id', component: WorkStatusAddEditComponent, canActivate: [AuthGuard]},
  { path: 'work-status/delete/:id', component: WorkStatusDeleteComponent, canActivate: [AuthGuard]},
  { path: 'work-status/edit/new/:id', component: WorkStatusAddEditComponent, canActivate: [AuthGuard]},
  { path: 'banks/list', component: BanksListComponent, canActivate: [AuthGuard]},
  { path: 'banks/edit/:id', component: BanksAddEditComponent, canActivate: [AuthGuard]},
  { path: 'banks/delete/:id', component: BanksDeleteComponent, canActivate: [AuthGuard]},
  { path: 'banks/edit/new/:id', component: BanksAddEditComponent, canActivate: [AuthGuard]}
];
