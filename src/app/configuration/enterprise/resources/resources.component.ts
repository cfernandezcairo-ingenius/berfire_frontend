import { Component } from '@angular/core';
import { SignatureComponent } from '../signature/signature.component';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [SignatureComponent, UploadImageComponent],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.scss'
})
export class ResourcesComponent {

}
