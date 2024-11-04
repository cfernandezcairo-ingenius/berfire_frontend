import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFacturasComponent } from './estados-facturas.component';

describe('EstadosFacturasComponent', () => {
  let component: EstadosFacturasComponent;
  let fixture: ComponentFixture<EstadosFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosFacturasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
