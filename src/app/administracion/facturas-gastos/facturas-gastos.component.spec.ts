import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasGastosComponent } from './facturas-gastos.component';

describe('FacturasGastosComponent', () => {
  let component: FacturasGastosComponent;
  let fixture: ComponentFixture<FacturasGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacturasGastosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturasGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
