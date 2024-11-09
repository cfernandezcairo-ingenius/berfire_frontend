import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosAlbaranesEntregasDeleteComponent } from './statement-order-delete.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: EstadosAlbaranesEntregasDeleteComponent;
  let fixture: ComponentFixture<EstadosAlbaranesEntregasDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosAlbaranesEntregasDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosAlbaranesEntregasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
