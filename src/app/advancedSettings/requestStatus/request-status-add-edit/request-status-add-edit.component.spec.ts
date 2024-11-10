import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusAddEditComponent } from './request-status-add-edit.component';

describe('RequestStatusAddEditComponent', () => {
  let component: RequestStatusAddEditComponent;
  let fixture: ComponentFixture<RequestStatusAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestStatusAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestStatusAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
