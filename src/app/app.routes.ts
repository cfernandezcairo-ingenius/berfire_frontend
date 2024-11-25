import { Routes } from '@angular/router';
import { LoginBerfireComponent } from './auth/login-berfire/login-berfire.component';
import { AuthGuard } from './share/common/auth-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeliveryNoteStatesListComponent } from './advancedSettings/DeliveryNoteStates/delivery-note-states-list/delivery-note-states-list.component';
import { DeliveryNoteStatesAddEditComponent } from './advancedSettings/DeliveryNoteStates/delivery-note-states-add-edit/delivery-note-states-add-edit.component';
import { DeliveryNoteStatesDeleteComponent } from './advancedSettings/DeliveryNoteStates/delivery-note-states-delete/delivery-note-states-delete.component'
import { BillStatusDeleteComponent } from './advancedSettings/billStatus/bill-status-delete/bill-status-delete.component';
import { StatementOrderListComponent } from './advancedSettings/statement-order/statement-order-list/statement-order-list.component';
import { StatementOrdersAddEditComponent } from './advancedSettings/statement-order/statement-order-add-edit/statement-order-add-edit.component';
import { StatementOrderDeleteComponent } from './advancedSettings/statement-order/statement-order-delete/statement-order-delete.component';
import { PaymenFormsListComponent } from './advancedSettings/paymentForms/payment-forms-list/payment-forms-list.component';
import { PaymentFormsAddEditComponent } from './advancedSettings/paymentForms/payment-forms-add-edit/payment-forms-add-edit.component';
import { RequestStatusListComponent } from './advancedSettings/requestStatus/request-status-list/request-status-list.component';
import { RequestStatusAddEditComponent } from './advancedSettings/requestStatus/request-status-add-edit/request-status-add-edit.component';
import { RequestStatusDeleteComponent } from './advancedSettings/requestStatus/request-status-delete/request-status-delete.component';
import { WorkStatusListComponent } from './advancedSettings/workStatus/work-status-list/work-status-list.component';
import { WorkStatusAddEditComponent } from './advancedSettings/workStatus/work-status-add-edit/work-status-add-edit.component';
import { WorkStatusDeleteComponent } from './advancedSettings/workStatus/work-status-delete/work-status-delete.component';
import { BanksListComponent } from './advancedSettings/banks/banks-list/banks-list.component';
import { BanksAddEditComponent } from './advancedSettings/banks/banks-add-edit/banks-add-edit.component';
import { BanksDeleteComponent } from './advancedSettings/banks/banks-delete/banks-delete.component';
import { BillStatusListComponent } from './advancedSettings/billStatus/bill-status-list/bill-status-list.component';
import { BillStatusAddEditComponent } from './advancedSettings/billStatus/bill-status-add-edit/bill-status-add-edit.component';
import { AllAddEditNewComponent } from './all-add-edit-new/all-add-edit-new.component';
import { PopulationsListComponent } from './advancedSettings/populations/populations-list/populations-list.component';
import { PopulationsAddEditComponent } from './advancedSettings/populations/populations-add-edit/populations-add-edit.component';
import { PopulationsDeleteComponent } from './advancedSettings/populations/populations-delete/populations-delete.component';
import { UnsubscribeReasonsListComponent } from './advancedSettings/UnsubscribeEquipmentReasons/unsubscribe-reasons-list/unsubscribe-reasons-list.component';
import { UnsubscribeReasonsAddEditComponent } from './advancedSettings/UnsubscribeEquipmentReasons/unsubscribe-reasons-add-edit/unsubscribe-reasons-add-edit.component';
import { UnsubscribeReasonsDeleteComponent } from './advancedSettings/UnsubscribeEquipmentReasons/unsubscribe-reasons-delete/unsubscribe-reasons-delete.component';
import { ClientsTypesListComponent } from './advancedSettings/clientsTypes/clients-types-list/clients-types-list.component';
import { ClientsTypesAddEditComponent } from './advancedSettings/clientsTypes/clients-types-add-edit/clients-types-add-edit.component';
import { ClientsTypesDeleteComponent } from './advancedSettings/clientsTypes/clients-types-delete/clients-types-delete.component';
import { ContractsTypesListComponent } from './advancedSettings/contractsTypes/contracts-types-list/contracts-types-list.component';
import { ContractsTypesAddEditComponent } from './advancedSettings/contractsTypes/contracts-types-add-edit/contracts-types-add-edit.component';
import { ContractsTypesDeleteComponent } from './advancedSettings/contractsTypes/contracts-types-delete/contracts-types-delete.component';
import { TaxesAddEditComponent } from './advancedSettings/taxes/taxes-add-edit/taxes-add-edit.component';
import { TaxesListComponent } from './advancedSettings/taxes/taxes-list/taxes-list.component';
import { TaxesDeleteComponent } from './advancedSettings/taxes/taxes-delete/taxes-delete.component';
import { PvPRatesListComponent } from './advancedSettings/pvpRates/pvp-rates-list/pvp-rates-list.component';
import { PVPRatesAddEditComponent } from './advancedSettings/pvpRates/pvp-rates-add-edit/pvp-rates-add-edit.component';
import { PvpRatesDeleteComponent } from './advancedSettings/pvpRates/pvp-rates-delete/pvp-rates-delete.component';
import { StatesPartiesReviewListComponent } from './advancedSettings/StatesPartiesReview/states-parties-review-list/states-parties-review-list.component';
import { StatesPartiesReviewAddEditComponent } from './advancedSettings/StatesPartiesReview/states-parties-review-add-edit/states-parties-review-add-edit.component';
import { StatesPartiesReviewDeleteComponent } from './advancedSettings/StatesPartiesReview/states-parties-review-delete/states-parties-review-delete.component';
import { ManufacturersAddEditComponent } from './configuration/manufacturers/manufacturers-add-edit/manufacturers-add-edit.component';
import { ManufacturersDeleteComponent } from './configuration/manufacturers/manufacturers-delete/manufacturers-delete.component';
import { ManufacturersListComponent } from './configuration/manufacturers/manufacturers-list/manufacturers-list.component';
import { TechnicalsListComponent } from './technicals/technicals-list/technicals-list.component';
import { TechnicalsAddEditComponent } from './technicals/technicals-add-edit/technicals-add-edit.component';
import { DocumentsTemplatesListComponent } from './configuration/documents-templates/documents-templates-list/documents-templates-list.component';
import { DocumentsTemplatesAddEditComponent } from './configuration/documents-templates/documents-templates-add-edit/documents-templates-add-edit.component';
import { DocumentsTemplatesDeleteComponent } from './configuration/documents-templates/documents-templates-delete/documents-templates-delete.component';
import { PrTypesListComponent } from './configuration/prTypes/prTypes-list/prTypes-list.component';
import { PrTypesAddEditComponent } from './configuration/prTypes/prTypes-add-edit/prTypes-add-edit.component';
import { PrTypesDeleteComponent } from './configuration/prTypes/prTypes-delete/prTypes-delete.component';

export const routes: Routes = [

  { path: '',redirectTo: "login", pathMatch: "full" },
  { path: 'login', component: LoginBerfireComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard] },
  { path: 'delivery-note-states/list', component: DeliveryNoteStatesListComponent, canActivate: [AuthGuard]},
  { path: 'delivery-note-states/edit/:id', component: DeliveryNoteStatesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'delivery-note-states/edit/new/:id', component: DeliveryNoteStatesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'delivery-note-states/delete/:id', component: DeliveryNoteStatesDeleteComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/list', component: BillStatusListComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/edit/:id', component: BillStatusAddEditComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/delete/:id', component: BillStatusDeleteComponent, canActivate: [AuthGuard]},
  { path: 'invoice-status/edit/new/:id', component: BillStatusAddEditComponent, canActivate: [AuthGuard]},
  { path: 'all/edit/new', component: AllAddEditNewComponent, canActivate: [AuthGuard]},
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
  { path: 'banks/edit/new/:id', component: BanksAddEditComponent, canActivate: [AuthGuard]},
  { path: 'populations/list', component: PopulationsListComponent, canActivate: [AuthGuard]},
  { path: 'populations/edit/:id', component: PopulationsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'populations/delete/:id', component: PopulationsDeleteComponent, canActivate: [AuthGuard]},
  { path: 'populations/edit/new/:id', component: PopulationsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'unsubscribe-reasons/list', component: UnsubscribeReasonsListComponent, canActivate: [AuthGuard]},
  { path: 'unsubscribe-reasons/edit/:id', component: UnsubscribeReasonsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'unsubscribe-reasons/delete/:id', component: UnsubscribeReasonsDeleteComponent , canActivate: [AuthGuard]},
  { path: 'unsubscribe-reasons/edit/new/:id', component: UnsubscribeReasonsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'clients-types/list', component: ClientsTypesListComponent, canActivate: [AuthGuard]},
  { path: 'clients-types/edit/:id', component: ClientsTypesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'clients-types/delete/:id', component: ClientsTypesDeleteComponent , canActivate: [AuthGuard]},
  { path: 'clients-types/edit/new/:id', component: ClientsTypesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'contracts-types/list', component: ContractsTypesListComponent, canActivate: [AuthGuard]},
  { path: 'contracts-types/edit/:id', component: ContractsTypesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'contracts-types/delete/:id', component: ContractsTypesDeleteComponent , canActivate: [AuthGuard]},
  { path: 'contracts-types/edit/new/:id', component: ContractsTypesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'taxes/list', component: TaxesListComponent, canActivate: [AuthGuard]},
  { path: 'taxes/edit/:id', component: TaxesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'taxes/delete/:id', component: TaxesDeleteComponent , canActivate: [AuthGuard]},
  { path: 'taxes/edit/new/:id', component: TaxesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'pvp-rates/list', component: PvPRatesListComponent, canActivate: [AuthGuard]},
  { path: 'pvp-rates/edit/:id', component: PVPRatesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'pvp-rates/delete/:id', component: PvpRatesDeleteComponent , canActivate: [AuthGuard]},
  { path: 'pvp-rates/edit/new/:id', component: PVPRatesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'states-parties-review/list', component: StatesPartiesReviewListComponent, canActivate: [AuthGuard]},
  { path: 'states-parties-review/edit/:id', component: StatesPartiesReviewAddEditComponent, canActivate: [AuthGuard]},
  { path: 'states-parties-review/delete/:id', component: StatesPartiesReviewDeleteComponent , canActivate: [AuthGuard]},
  { path: 'states-parties-review/edit/new/:id', component: StatesPartiesReviewAddEditComponent, canActivate: [AuthGuard]},
  { path: 'manufacturers/list', component: ManufacturersListComponent, canActivate: [AuthGuard]},
  { path: 'manufacturers/edit/:id', component: ManufacturersAddEditComponent, canActivate: [AuthGuard]},
  { path: 'manufacturers/delete/:id', component: ManufacturersDeleteComponent , canActivate: [AuthGuard]},
  { path: 'manufacturers/edit/new/:id', component: ManufacturersAddEditComponent, canActivate: [AuthGuard]},
  { path: 'technicals/list', component: TechnicalsListComponent, canActivate: [AuthGuard]},
  { path: 'technicals/edit/:id', component: TechnicalsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'technicals/delete/:id', component: TechnicalsListComponent , canActivate: [AuthGuard]},
  { path: 'technicals/edit/new/:id', component: TechnicalsAddEditComponent, canActivate: [AuthGuard]},
  { path: 'documents-templates/list', component: DocumentsTemplatesListComponent, canActivate: [AuthGuard]},
  { path: 'documents-templates/edit/:id', component: DocumentsTemplatesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'documents-templates/delete/:id', component: DocumentsTemplatesDeleteComponent , canActivate: [AuthGuard]},
  { path: 'documents-templates/edit/new/:id', component: DocumentsTemplatesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'prTypes/list', component: PrTypesListComponent, canActivate: [AuthGuard]},
  { path: 'prTypes/edit/:id', component: PrTypesAddEditComponent, canActivate: [AuthGuard]},
  { path: 'prTypes/delete/:id', component: PrTypesDeleteComponent , canActivate: [AuthGuard]},
  { path: 'prTypes/edit/new/:id', component: PrTypesAddEditComponent, canActivate: [AuthGuard]},
];
