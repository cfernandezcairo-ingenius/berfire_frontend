import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PvpRatesDeleteComponent } from './pvp-rates-delete.component';

describe('PvpRatesDeleteComponent', () => {
  let component: PvpRatesDeleteComponent;
  let fixture: ComponentFixture<PvpRatesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PvpRatesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PvpRatesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
