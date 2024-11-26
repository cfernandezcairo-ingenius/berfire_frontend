import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { StyleManager } from '../../../../services/style-manager.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonIconPrimaryComponent } from "../../button-icon-primary/button-icon-primary.component";

@Component({
  selector: 'app-pdf-generator',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatIconModule, TranslateModule, ButtonIconPrimaryComponent],
  templateUrl: './pdf-generator.component.html',
  styleUrl: './pdf-generator.component.scss',
  providers: [TranslateService]
})
export class PdfGeneratorComponent {

  @Input() dataSource: any = [];
  @Input() header: any = [];
  darkMode = false;

  constructor(
    private darkModeService: StyleManager,
    private translate: TranslateService
  ){
    this.darkModeService.darkMode$.subscribe(dark => {
      this.darkMode = dark;
    });
  }

  addImage() {
    const imgElement = document.getElementById('miImagen') as HTMLImageElement;

    if (imgElement) {
      const pdf = new jsPDF();

      // Crear un canvas para convertir la imagen
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Establecer el tamaño del canvas
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      // Dibujar la imagen en el canvas
      ctx?.drawImage(imgElement, 0, 0);

      // Convertir el canvas a base64
      const imgData = canvas.toDataURL('image/png');

      // Agregar la imagen al PDF
      pdf.addImage(imgData, 'PNG', 10, 10, imgElement.width, imgElement.height); // Ajusta la posición y tamaño

      // Guardar el PDF
      pdf.save('documento.pdf');
    }
  }

  generatePDF() {
		// Create a new PDF document.
		const doc = new jsPDF();

		// Add content to the PDF.
		doc.setFontSize(16);
		doc.text('My Angular PDF Generator', 60, 10);
		doc.setFontSize(12);

    //Tratamiento del logo
    const imgUrl = 'ingeniusLogo.png';
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      doc.addImage(img, 'PNG', 10, 10, 40, 23,'Alias','FAST'); // Ajusta la posición y tamaño
      const headers = [this.header];
      const data = this.dataSource.map((ds: any) => [
          ds.id,
          ds.name,
          ds.lastname,
          ds.email,
          ds.address,
          ds.mobile
      ]);

      autoTable(doc, {
        head: headers,
        body: data,
        startY: 50, // Adjust the `startY` position as needed.
      });

      // Save the PDF.
      doc.save('table.pdf');
    }
	}

}
