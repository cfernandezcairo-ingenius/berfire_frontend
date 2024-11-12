import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeReasonsDeleteComponent } from './unsubscribe-reasons-delete.component';

describe('EstadosFacturasDeleteComponent', () => {
  let component: UnsubscribeReasonsDeleteComponent;
  let fixture: ComponentFixture<UnsubscribeReasonsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribeReasonsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsubscribeReasonsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
