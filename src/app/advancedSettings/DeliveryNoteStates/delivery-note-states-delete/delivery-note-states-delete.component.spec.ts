import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNoteStatesDeleteComponent } from './delivery-note-states-delete.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: DeliveryNoteStatesDeleteComponent;
  let fixture: ComponentFixture<DeliveryNoteStatesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryNoteStatesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryNoteStatesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
