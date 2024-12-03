import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs'
import { EnterpriseDetailsComponent } from "../enterprise-details/enterprise-details.component";
import { ResourcesComponent } from "../resources/resources.component";
import { TextDocumentsComponent } from "../text-documents/text-documents.component";
import { DeliveryNoteRevisionComponent } from "../delivery-note-revision/delivery-note-revision.component";
import { RevisionCertificateComponent } from "../revision-certificate/revision-certificate.component";
import { MaintenanceCertificateComponent } from "../maintenance-certificate/maintenance-certificate.component";
import { ContractsComponent } from "../contracts/contracts.component";
import { InstallCertificationComponent } from "../install-certification/install-certification.component";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enterprise',
  standalone: true,
  imports: [MatTabsModule, EnterpriseDetailsComponent, ResourcesComponent, TextDocumentsComponent, DeliveryNoteRevisionComponent, RevisionCertificateComponent, MaintenanceCertificateComponent, ContractsComponent, InstallCertificationComponent],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.scss'
})
export class EnterpriseComponent {

  fgDetails = new FormGroup({});
  modelDetails: any;

  constructor() {
    this.fgDetails.valueChanges.subscribe({
      next: (res:any) => {
      }
    });
  }

}
