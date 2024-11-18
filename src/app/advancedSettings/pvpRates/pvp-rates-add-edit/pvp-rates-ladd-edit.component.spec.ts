import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PVPRatesAddEditComponent } from './pvp-rates-add-edit.component';

describe('PVPRatesAddEditComponent', () => {
  let component: PVPRatesAddEditComponent;
  let fixture: ComponentFixture<PVPRatesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PVPRatesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PVPRatesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
