import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormsAddEditComponent } from './payment-forms-add-edit.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: PaymentFormsAddEditComponent;
  let fixture: ComponentFixture<PaymentFormsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFormsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFormsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
