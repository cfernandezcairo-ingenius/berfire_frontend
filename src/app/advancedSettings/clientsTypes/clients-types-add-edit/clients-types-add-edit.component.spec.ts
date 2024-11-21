import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTypesAddEditComponent } from './clients-types-add-edit.component';

describe('EstadosAlbaranesEntregasAddEditComponent', () => {
  let component: ClientsTypesAddEditComponent;
  let fixture: ComponentFixture<ClientsTypesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTypesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
