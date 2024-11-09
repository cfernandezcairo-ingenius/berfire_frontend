import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFacturasDeleteComponent } from './estados-facturas-delete.component';

describe('EstadosFacturasDeleteComponent', () => {
  let component: EstadosFacturasDeleteComponent;
  let fixture: ComponentFixture<EstadosFacturasDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosFacturasDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosFacturasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
