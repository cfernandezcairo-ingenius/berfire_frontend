import { Routes } from '@angular/router';
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
import { PrIncidentsAddEditComponent } from './configuration/prIncidents/prIncidents-add-edit/prIncidents-add-edit.component';
import { PrIncidentsListComponent } from './configuration/prIncidents/prIncidents-list/prIncidents-list.component';
import { PrIncidentsDeleteComponent } from './configuration/prIncidents/prIncidents-delete/prIncidents-delete.component';
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular';

export const routes: Routes = [

  { path: 'redirect', component: MsalRedirectComponent },

  { path: '',redirectTo: "dashboard", pathMatch: "full" },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [MsalGuard] },
  { path: 'delivery-note-states/list', component: DeliveryNoteStatesListComponent, canActivate: [MsalGuard]},
  { path: 'delivery-note-states/edit', component: DeliveryNoteStatesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'delivery-note-states/edit/new', component: DeliveryNoteStatesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'delivery-note-states/delete', component: DeliveryNoteStatesDeleteComponent, canActivate: [MsalGuard]},
  { path: 'invoice-status/list', component: BillStatusListComponent, canActivate: [MsalGuard]},
  { path: 'invoice-status/edit', component: BillStatusAddEditComponent, canActivate: [MsalGuard]},
  { path: 'invoice-status/delete', component: BillStatusDeleteComponent, canActivate: [MsalGuard]},
  { path: 'invoice-status/edit/new', component: BillStatusAddEditComponent, canActivate: [MsalGuard]},
  { path: 'all/edit/new', component: AllAddEditNewComponent, canActivate: [MsalGuard]},
  { path: 'statement-order/list', component: StatementOrderListComponent, canActivate: [MsalGuard]},
  { path: 'statement-order/edit', component: StatementOrdersAddEditComponent, canActivate: [MsalGuard]},
  { path: 'statement-order/delete', component: StatementOrderDeleteComponent, canActivate: [MsalGuard]},
  { path: 'statement-order/edit/new', component: StatementOrdersAddEditComponent, canActivate:[MsalGuard]},
  { path: 'payment-forms/list', component: PaymenFormsListComponent, canActivate: [MsalGuard]},
  { path: 'payment-forms/edit', component: PaymentFormsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'payment-forms/delete', component: StatementOrderDeleteComponent, canActivate: [MsalGuard]},
  { path: 'payment-forms/edit/new', component: StatementOrdersAddEditComponent, canActivate: [MsalGuard]},
  { path: 'request-status/list', component: RequestStatusListComponent, canActivate: [MsalGuard]},
  { path: 'request-status/edit', component: RequestStatusAddEditComponent, canActivate: [MsalGuard]},
  { path: 'request-status/delete', component: RequestStatusDeleteComponent, canActivate: [MsalGuard]},
  { path: 'request-status/edit/new', component: RequestStatusAddEditComponent, canActivate: [MsalGuard]},
  { path: 'work-status/list', component: WorkStatusListComponent, canActivate: [MsalGuard]},
  { path: 'work-status/edit', component: WorkStatusAddEditComponent, canActivate: [MsalGuard]},
  { path: 'work-status/delete', component: WorkStatusDeleteComponent, canActivate: [MsalGuard]},
  { path: 'work-status/edit/new', component: WorkStatusAddEditComponent, canActivate: [MsalGuard]},
  { path: 'banks/list', component: BanksListComponent, canActivate: [MsalGuard]},
  { path: 'banks/edit', component: BanksAddEditComponent, canActivate: [MsalGuard]},
  { path: 'banks/delete', component: BanksDeleteComponent, canActivate: [MsalGuard]},
  { path: 'banks/edit/new', component: BanksAddEditComponent, canActivate: [MsalGuard]},
  { path: 'populations/list', component: PopulationsListComponent, canActivate: [MsalGuard]},
  { path: 'populations/edit', component: PopulationsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'populations/delete', component: PopulationsDeleteComponent, canActivate: [MsalGuard]},
  { path: 'populations/edit/new', component: PopulationsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'unsubscribe-reasons/list', component: UnsubscribeReasonsListComponent, canActivate: [MsalGuard]},
  { path: 'unsubscribe-reasons/edit', component: UnsubscribeReasonsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'unsubscribe-reasons/delete', component: UnsubscribeReasonsDeleteComponent , canActivate: [MsalGuard]},
  { path: 'unsubscribe-reasons/edit/new', component: UnsubscribeReasonsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'clients-types/list', component: ClientsTypesListComponent, canActivate: [MsalGuard]},
  { path: 'clients-types/edit', component: ClientsTypesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'clients-types/delete', component: ClientsTypesDeleteComponent , canActivate: [MsalGuard]},
  { path: 'clients-types/edit/new', component: ClientsTypesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'contracts-types/list', component: ContractsTypesListComponent, canActivate: [MsalGuard]},
  { path: 'contracts-types/edit', component: ContractsTypesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'contracts-types/delete', component: ContractsTypesDeleteComponent , canActivate: [MsalGuard]},
  { path: 'contracts-types/edit/new', component: ContractsTypesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'taxes/list', component: TaxesListComponent, canActivate: [MsalGuard]},
  { path: 'taxes/edit', component: TaxesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'taxes/delete', component: TaxesDeleteComponent , canActivate: [MsalGuard]},
  { path: 'taxes/edit/new', component: TaxesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'pvp-rates/list', component: PvPRatesListComponent, canActivate: [MsalGuard]},
  { path: 'pvp-rates/edit', component: PVPRatesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'pvp-rates/delete', component: PvpRatesDeleteComponent , canActivate: [MsalGuard]},
  { path: 'pvp-rates/edit/new', component: PVPRatesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'states-parties-review/list', component: StatesPartiesReviewListComponent, canActivate: [MsalGuard]},
  { path: 'states-parties-review/edit', component: StatesPartiesReviewAddEditComponent, canActivate: [MsalGuard]},
  { path: 'states-parties-review/delete', component: StatesPartiesReviewDeleteComponent , canActivate: [MsalGuard]},
  { path: 'states-parties-review/edit/new', component: StatesPartiesReviewAddEditComponent, canActivate: [MsalGuard]},
  { path: 'manufacturers/list', component: ManufacturersListComponent, canActivate: [MsalGuard]},
  { path: 'manufacturers/edit', component: ManufacturersAddEditComponent, canActivate: [MsalGuard]},
  { path: 'manufacturers/delete', component: ManufacturersDeleteComponent , canActivate: [MsalGuard]},
  { path: 'manufacturers/edit/new', component: ManufacturersAddEditComponent, canActivate: [MsalGuard]},
  { path: 'technicals/list', component: TechnicalsListComponent, canActivate: [MsalGuard]},
  { path: 'technicals/edit', component: TechnicalsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'technicals/delete', component: TechnicalsListComponent , canActivate: [MsalGuard]},
  { path: 'technicals/edit/new', component: TechnicalsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'documents-templates/list', component: DocumentsTemplatesListComponent, canActivate: [MsalGuard]},
  { path: 'documents-templates/edit', component: DocumentsTemplatesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'documents-templates/delete', component: DocumentsTemplatesDeleteComponent , canActivate: [MsalGuard]},
  { path: 'documents-templates/edit/new', component: DocumentsTemplatesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'prTypes/list', component: PrTypesListComponent, canActivate: [MsalGuard]},
  { path: 'prTypes/edit', component: PrTypesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'prTypes/delete', component: PrTypesDeleteComponent , canActivate: [MsalGuard]},
  { path: 'prTypes/edit/new', component: PrTypesAddEditComponent, canActivate: [MsalGuard]},
  { path: 'prIncidents/list', component: PrIncidentsListComponent, canActivate: [MsalGuard]},
  { path: 'prIncidents/edit', component: PrIncidentsAddEditComponent, canActivate: [MsalGuard]},
  { path: 'prIncidents/delete', component: PrIncidentsDeleteComponent , canActivate: [MsalGuard]},
  { path: 'prIncidents/edit/new', component: PrIncidentsAddEditComponent, canActivate: [MsalGuard]},
];
