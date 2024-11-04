import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionesPlanificadasComponent } from './revisiones-planificadas.component';

describe('RevisionesPlanificadasComponent', () => {
  let component: RevisionesPlanificadasComponent;
  let fixture: ComponentFixture<RevisionesPlanificadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionesPlanificadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionesPlanificadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
