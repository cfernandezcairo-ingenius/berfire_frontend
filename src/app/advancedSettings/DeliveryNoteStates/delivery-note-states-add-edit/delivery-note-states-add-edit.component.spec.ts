import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNoteStatesAddEditComponent } from './delivery-note-states-add-edit.component';

describe('EstadosAlbaranesEntregasAddEditComponent', () => {
  let component: DeliveryNoteStatesAddEditComponent;
  let fixture: ComponentFixture<DeliveryNoteStatesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryNoteStatesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryNoteStatesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
