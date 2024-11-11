import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsTypesDeleteComponent } from './contracts-types-delete.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: ContractsTypesDeleteComponent;
  let fixture: ComponentFixture<ContractsTypesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractsTypesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsTypesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
