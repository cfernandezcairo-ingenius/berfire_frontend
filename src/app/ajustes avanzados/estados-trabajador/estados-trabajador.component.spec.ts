import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosTrabajadorComponent } from './estados-trabajador.component';

describe('EstadosTrabajadorComponent', () => {
  let component: EstadosTrabajadorComponent;
  let fixture: ComponentFixture<EstadosTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
