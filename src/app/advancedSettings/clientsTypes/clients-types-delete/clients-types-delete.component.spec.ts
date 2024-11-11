import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTypesDeleteComponent } from './clients-types-delete.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: ClientsTypesDeleteComponent;
  let fixture: ComponentFixture<ClientsTypesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTypesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsTypesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
