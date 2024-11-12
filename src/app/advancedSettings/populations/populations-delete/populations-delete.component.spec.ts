import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationsDeleteComponent } from './populations-delete.component';

describe('EstadosFacturasDeleteComponent', () => {
  let component: PopulationsDeleteComponent;
  let fixture: ComponentFixture<PopulationsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
