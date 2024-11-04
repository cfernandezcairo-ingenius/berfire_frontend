import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioEjecucionComponent } from './calendario-ejecucion.component';

describe('CalendarioEjecucionComponent', () => {
  let component: CalendarioEjecucionComponent;
  let fixture: ComponentFixture<CalendarioEjecucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioEjecucionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
