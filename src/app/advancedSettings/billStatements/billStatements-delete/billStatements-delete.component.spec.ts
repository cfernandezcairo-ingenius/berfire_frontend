import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStatementsDeleteComponent } from './billStatements-delete.component';

describe('EstadosFacturasDeleteComponent', () => {
  let component: BillStatementsDeleteComponent;
  let fixture: ComponentFixture<BillStatementsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillStatementsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillStatementsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
