import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationsListComponent } from  './populations-list.component';

describe('EstadosFacturasListComponent', () => {
  let component: PopulationsListComponent;
  let fixture: ComponentFixture<PopulationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
