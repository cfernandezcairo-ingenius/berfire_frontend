import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesDeleteComponent } from './taxes-delete.component';

describe('TaxesDeleteComponent', () => {
  let component: TaxesDeleteComponent;
  let fixture: ComponentFixture<TaxesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
