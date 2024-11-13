import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesListComponent } from  './taxes-list.component';

describe('EstadosFacturasListComponent', () => {
  let component: TaxesListComponent;
  let fixture: ComponentFixture<TaxesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
