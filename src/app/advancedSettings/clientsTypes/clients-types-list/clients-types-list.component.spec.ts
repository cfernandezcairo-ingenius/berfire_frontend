import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTypesListComponent } from './clients-types-list.component';

describe('EstadosAlbaranesEntregasListComponent', () => {
  let component: ClientsTypesListComponent;
  let fixture: ComponentFixture<ClientsTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTypesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
