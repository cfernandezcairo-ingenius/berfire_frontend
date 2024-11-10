import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasPvpComponent } from './tarifas-pvp.component';

describe('TarifasPvpComponent', () => {
  let component: TarifasPvpComponent;
  let fixture: ComponentFixture<TarifasPvpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarifasPvpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasPvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
