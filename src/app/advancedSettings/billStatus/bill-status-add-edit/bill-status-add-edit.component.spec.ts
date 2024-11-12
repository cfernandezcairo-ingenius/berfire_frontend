import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStatusAddEditComponent } from './bill-status-add-edit.component';

describe('BillStatusAddEditComponent', () => {
  let component: BillStatusAddEditComponent;
  let fixture: ComponentFixture<BillStatusAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillStatusAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillStatusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
