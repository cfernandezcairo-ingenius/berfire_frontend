import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivosBajaEquipamientoComponent } from './motivos-baja-equipamiento.component';

describe('MotivosBajaEquipamientoComponent', () => {
  let component: MotivosBajaEquipamientoComponent;
  let fixture: ComponentFixture<MotivosBajaEquipamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivosBajaEquipamientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivosBajaEquipamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
