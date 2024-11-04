import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeudasProveedorComponent } from './deudas-proveedor.component';

describe('DeudasProveedorComponent', () => {
  let component: DeudasProveedorComponent;
  let fixture: ComponentFixture<DeudasProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeudasProveedorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeudasProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
