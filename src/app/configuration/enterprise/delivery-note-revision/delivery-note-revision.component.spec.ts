import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryNoteRevisionComponent } from './delivery-note-revision.component';

describe('DeliveryNoteRevisionComponent', () => {
  let component: DeliveryNoteRevisionComponent;
  let fixture: ComponentFixture<DeliveryNoteRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryNoteRevisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryNoteRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
