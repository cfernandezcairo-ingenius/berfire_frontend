import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesPartiesReviewAddEditComponent } from './states-parties-review-add-edit.component';

describe('StatementOrdersAddEditComponent', () => {
  let component: StatesPartiesReviewAddEditComponent;
  let fixture: ComponentFixture<StatesPartiesReviewAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesPartiesReviewAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesPartiesReviewAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
