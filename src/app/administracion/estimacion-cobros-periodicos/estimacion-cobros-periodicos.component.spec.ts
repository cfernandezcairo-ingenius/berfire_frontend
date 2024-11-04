import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimacionCobrosPeriodicosComponent } from './estimacion-cobros-periodicos.component';

describe('EstimacionCobrosPeriodicosComponent', () => {
  let component: EstimacionCobrosPeriodicosComponent;
  let fixture: ComponentFixture<EstimacionCobrosPeriodicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstimacionCobrosPeriodicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimacionCobrosPeriodicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
