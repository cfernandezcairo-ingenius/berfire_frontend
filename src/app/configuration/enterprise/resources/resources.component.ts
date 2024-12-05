import { Component } from '@angular/core';
import { SignatureComponent } from '../signature/signature.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';
import { UploadSelloIsoComponent } from '../upload-sello-iso/upload-sello-iso.component';
import { UploadLogoComponent } from "../upload-logo/upload-logo.component";

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [SignatureComponent, UploadImageComponent, UploadSelloIsoComponent, UploadLogoComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {

}
