import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesAddEditComponent } from './taxes-add-edit.component';

describe('TaxesAddEditComponent', () => {
  let component: TaxesAddEditComponent;
  let fixture: ComponentFixture<TaxesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
