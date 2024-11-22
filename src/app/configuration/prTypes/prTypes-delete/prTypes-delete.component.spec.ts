import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrTypesDeleteComponent } from './prTypes-delete.component';

describe('PrTypesDeleteComponent', () => {
  let component: PrTypesDeleteComponent;
  let fixture: ComponentFixture<PrTypesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrTypesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrTypesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
