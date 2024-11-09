import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFacturasListComponent } from  './estados-facturas-list.component';

describe('EstadosFacturasListComponent', () => {
  let component: EstadosFacturasListComponent;
  let fixture: ComponentFixture<EstadosFacturasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosFacturasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosFacturasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
