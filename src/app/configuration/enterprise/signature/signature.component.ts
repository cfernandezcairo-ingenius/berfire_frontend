import { Component, ViewChild, ElementRef } from '@angular/core';
import { ButtonPrimaryComponent } from "../../../share/common/UI/button-primary/button-primary.component";
import { ButtonIconPrimaryComponent } from "../../../share/common/UI/button-icon-primary/button-icon-primary.component";

@Component({
  selector: 'app-signature',
  standalone: true,
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
  imports: [ButtonPrimaryComponent, ButtonIconPrimaryComponent]
})
export class SignatureComponent {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngOnInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    this.canvasRef.nativeElement.addEventListener('mousedown', this.iniciarDibujo.bind(this));
    this.canvasRef.nativeElement.addEventListener('mousemove', this.dibujar.bind(this));
    this.canvasRef.nativeElement.addEventListener('mouseup', this.terminarDibujo.bind(this));
    this.canvasRef.nativeElement.addEventListener('mouseout', this.terminarDibujo.bind(this));
  }

  iniciarDibujo(event: MouseEvent) {
    this.drawing = true;
    this.dibujar(event);
  }

  dibujar(event: MouseEvent) {
    if (!this.drawing) return;

    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  terminarDibujo() {
    this.drawing = false;
    this.ctx.beginPath();
  }

  limpiar() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  guardarFirma() {
    const dataURL = this.canvasRef.nativeElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'signature.png';
    link.click();
  }
}

