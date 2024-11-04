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
  { path: 'expirations', component:VencimientosComponent, canActivate: [AuthGuard]},
  { path: 'corrective-budgets', component: PreupuestosCorrectivoaComponent, canActivate: [AuthGuard]},
  { path: 'handle-rectification', component: GestionarRectificativasComponent, canActivate: [AuthGuard]},
  { path: 'invoice-report', component: ReportesFacturacionComponent, canActivate: [AuthGuard]}

];
