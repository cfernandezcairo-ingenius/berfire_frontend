import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrTypesAddEditComponent } from './prTypes-add-edit.component';

describe('StatementOrdersAddEditComponent', () => {
  let component: PrTypesAddEditComponent;
  let fixture: ComponentFixture<PrTypesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrTypesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
