import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosFacturasAddEditComponent } from './estados-facturas-add-edit.component';

describe('EstadosFacturasAddEditComponent', () => {
  let component: EstadosFacturasAddEditComponent;
  let fixture: ComponentFixture<EstadosFacturasAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosFacturasAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosFacturasAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
