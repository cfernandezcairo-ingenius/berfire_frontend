import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-sello-iso',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './upload-sello-iso.component.html',
  styleUrls: ['./upload-sello-iso.component.scss']
})
export class UploadSelloIsoComponent {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post('URL_DEL_BACKEND', formData).subscribe({
        next: (res:any) => {
          console.log('Imagen subida con éxito');
        },
        error: (error: any) => {
          console.error('Error al subir la imagen', error);
        }
    });
    } else {
      console.error('No se ha seleccionado ninguna imagen');
    }
  }
}

