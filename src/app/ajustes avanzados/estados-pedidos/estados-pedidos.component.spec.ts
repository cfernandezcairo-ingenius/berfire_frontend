import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosPedidosComponent } from './estados-pedidos.component';

describe('EstadosPedidosComponent', () => {
  let component: EstadosPedidosComponent;
  let fixture: ComponentFixture<EstadosPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
