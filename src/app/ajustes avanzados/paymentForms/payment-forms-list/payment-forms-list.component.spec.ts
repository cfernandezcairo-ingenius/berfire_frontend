import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenFormsListComponent } from './payment-forms-list.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: PaymenFormsListComponent;
  let fixture: ComponentFixture<PaymenFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymenFormsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymenFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
