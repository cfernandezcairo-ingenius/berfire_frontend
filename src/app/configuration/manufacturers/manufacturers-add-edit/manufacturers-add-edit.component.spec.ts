import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturersAddEditComponent } from './manufacturers-add-edit.component';

describe('WorkStatusAddEditComponent', () => {
  let component: ManufacturersAddEditComponent;
  let fixture: ComponentFixture<ManufacturersAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturersAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
