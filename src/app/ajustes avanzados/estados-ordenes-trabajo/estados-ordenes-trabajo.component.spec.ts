import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosOrdenesTrabajoComponent } from './estados-ordenes-trabajo.component';

describe('EstadosOrdenesTrabajoComponent', () => {
  let component: EstadosOrdenesTrabajoComponent;
  let fixture: ComponentFixture<EstadosOrdenesTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosOrdenesTrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosOrdenesTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
