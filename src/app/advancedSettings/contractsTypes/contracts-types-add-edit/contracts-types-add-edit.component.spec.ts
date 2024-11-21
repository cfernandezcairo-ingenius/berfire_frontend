import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsTypesAddEditComponent } from './contracts-types-add-edit.component';

describe('EstadosAlbaranesEntregasAddEditComponent', () => {
  let component: ContractsTypesAddEditComponent;
  let fixture: ComponentFixture<ContractsTypesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsTypesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
