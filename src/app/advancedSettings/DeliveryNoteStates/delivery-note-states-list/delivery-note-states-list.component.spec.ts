import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosAlbaranesEntregasListComponent } from './delivery-note-states-list.component';

describe('EstadosAlbaranesEntregasListComponent', () => {
  let component: EstadosAlbaranesEntregasListComponent;
  let fixture: ComponentFixture<EstadosAlbaranesEntregasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosAlbaranesEntregasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosAlbaranesEntregasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
