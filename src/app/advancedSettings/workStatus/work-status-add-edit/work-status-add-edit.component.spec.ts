import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStatusAddEditComponent } from './work-status-add-edit.component';

describe('WorkStatusAddEditComponent', () => {
  let component: WorkStatusAddEditComponent;
  let fixture: ComponentFixture<WorkStatusAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkStatusAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkStatusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
