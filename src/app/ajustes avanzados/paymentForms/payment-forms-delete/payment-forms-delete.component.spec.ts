import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormsDeleteComponent } from './payment-forms-delete.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: PaymentFormsDeleteComponent;
  let fixture: ComponentFixture<PaymentFormsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFormsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
