import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationsAddEditComponent } from './populations-add-edit.component';

describe('EstadosFacturasAddEditComponent', () => {
  let component: PopulationsAddEditComponent;
  let fixture: ComponentFixture<PopulationsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
