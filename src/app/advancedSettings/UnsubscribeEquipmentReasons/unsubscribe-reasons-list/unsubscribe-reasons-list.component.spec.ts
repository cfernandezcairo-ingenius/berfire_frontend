import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeReasonsListComponent } from  './unsubscribe-reasons-list.component';

describe('EstadosFacturasListComponent', () => {
  let component: UnsubscribeReasonsListComponent;
  let fixture: ComponentFixture<UnsubscribeReasonsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribeReasonsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsubscribeReasonsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
