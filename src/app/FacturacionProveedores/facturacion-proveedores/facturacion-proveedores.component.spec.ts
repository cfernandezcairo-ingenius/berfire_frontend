import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionProveedoresComponent } from './facturacion-proveedores.component';

describe('FacturacionProveedoresComponent', () => {
  let component: FacturacionProveedoresComponent;
  let fixture: ComponentFixture<FacturacionProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturacionProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturacionProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
