import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesPartiesReviewDeleteComponent } from './states-parties-review-delete.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: StatesPartiesReviewDeleteComponent;
  let fixture: ComponentFixture<StatesPartiesReviewDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatesPartiesReviewDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatesPartiesReviewDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
