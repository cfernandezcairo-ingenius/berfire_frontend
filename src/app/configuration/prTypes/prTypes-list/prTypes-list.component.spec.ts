import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrTypesListComponent } from './prTypes-list.component';

describe('PrTypesListComponent', () => {
  let component: PrTypesListComponent;
  let fixture: ComponentFixture<PrTypesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrTypesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
