import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStatementsListComponent } from  './billStatements-list.component';

describe('EstadosFacturasListComponent', () => {
  let component: BillStatementsListComponent;
  let fixture: ComponentFixture<BillStatementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillStatementsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillStatementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
