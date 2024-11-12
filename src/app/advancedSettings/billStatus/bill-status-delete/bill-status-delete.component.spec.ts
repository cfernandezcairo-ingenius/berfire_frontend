import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStatusDeleteComponent } from './bill-status-delete.component';

describe('EstadosFacturasDeleteComponent', () => {
  let component: BillStatusDeleteComponent;
  let fixture: ComponentFixture<BillStatusDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillStatusDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillStatusDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
