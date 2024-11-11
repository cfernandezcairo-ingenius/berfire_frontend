import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsTypesListComponent } from './contracts-types-list.component';

describe('EstadosAlbaranesEntregasListComponent', () => {
  let component: ContractsTypesListComponent;
  let fixture: ComponentFixture<ContractsTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsTypesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
