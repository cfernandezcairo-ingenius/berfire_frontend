import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsAddEditComponent } from './clients-add-edit.component';

describe('ClientsAddEditComponent', () => {
  let component: ClientsAddEditComponent;
  let fixture: ComponentFixture<ClientsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
