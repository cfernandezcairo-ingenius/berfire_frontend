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
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-enterprise',
  standalone: true,
  imports: [MatTabsModule, EnterpriseDetailsComponent, ResourcesComponent, TextDocumentsComponent, DeliveryNoteRevisionComponent, RevisionCertificateComponent, MaintenanceCertificateComponent, ContractsComponent, InstallCertificationComponent],
  templateUrl: './enterprise.component.html',
  styleUrl: './enterprise.component.scss'
})
export class EnterpriseComponent {

  fgDetails:FormGroup;
  fgTextDocuments: FormGroup;
  fgInstallCertification: FormGroup;
  fgResources: FormGroup;
  modelDetails: any;

  constructor(private readonly fb: FormBuilder) {

    this.fgDetails = this.fb.group({
      nifCif:[''],
      name: [''],
      fiscalName: [],
      fiscalAddress: [],
      fiscalPopulation: [],
      fiscalPostalCode: [],
      email: [],
      mainPhone: [],
      secondaryPhone: [],
      fax: [],
      webPage: [],
      engineerByDefault: [],
      iban: []
    });
    this.fgTextDocuments = this.fb.group({
      commercialRegister:[''],
      enterpriseRegistrationData: [''],
      lopd: [],
      article20VAT: []
    });
    this.fgInstallCertification = fb.group({
      certificateInstallationHeader: [],
      certificateInstallationFooter: []
    });
    this.fgResources = this.fb.group({
      signature: [],
      signatureImage: [],
      logo: [],
      seal:[]
    });
    this.fgDetails.valueChanges.subscribe({
      next: (det:any) => {
      }
    });
    this.fgTextDocuments.valueChanges.subscribe({
      next: (ted:any) => {
      }
    });
    this.fgInstallCertification.valueChanges.subscribe({
      next:(ins:any) => {

      }
    });
    this.fgResources.valueChanges.subscribe({
      next:(ins:any) => {

      }
    });
  }

}
