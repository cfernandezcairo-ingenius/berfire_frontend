import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStatusListComponent } from './technicals-list.component';

describe('RequestStatusListComponent', () => {
  let component: WorkStatusListComponent;
  let fixture: ComponentFixture<WorkStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkStatusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
