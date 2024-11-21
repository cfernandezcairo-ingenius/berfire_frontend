import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvPRatesListComponent } from './pvp-rates-list.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: PvPRatesListComponent;
  let fixture: ComponentFixture<PvPRatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PvPRatesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvPRatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
