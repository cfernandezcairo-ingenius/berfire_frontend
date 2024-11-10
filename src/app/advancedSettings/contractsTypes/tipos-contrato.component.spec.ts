import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposContratoComponent } from '../../advancedSettings/contractsTypes/tipos-contrato.component';

describe('TiposContratoComponent', () => {
  let component: TiposContratoComponent;
  let fixture: ComponentFixture<TiposContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposContratoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
