import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOrdersAddEditComponent } from './statement-order-add-edit.component';

describe('StatementOrdersAddEditComponent', () => {
  let component: StatementOrdersAddEditComponent;
  let fixture: ComponentFixture<StatementOrdersAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatementOrdersAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatementOrdersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
