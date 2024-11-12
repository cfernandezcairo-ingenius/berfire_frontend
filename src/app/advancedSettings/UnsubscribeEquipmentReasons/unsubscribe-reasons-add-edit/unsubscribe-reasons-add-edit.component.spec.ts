import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeReasonsAddEditComponent } from './unsubscribe-reasons-add-edit.component';

describe('EstadosFacturasAddEditComponent', () => {
  let component: UnsubscribeReasonsAddEditComponent;
  let fixture: ComponentFixture<UnsubscribeReasonsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribeReasonsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsubscribeReasonsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
