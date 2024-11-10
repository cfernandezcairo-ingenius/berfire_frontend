import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkStatusDeleteComponent } from './work-status-delete.component';

describe('RequestStatusDeleteComponent', () => {
  let component: WorkStatusDeleteComponent;
  let fixture: ComponentFixture<WorkStatusDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkStatusDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkStatusDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
