import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusDeleteComponent } from './request-status-delete.component';

describe('RequestStatusDeleteComponent', () => {
  let component: RequestStatusDeleteComponent;
  let fixture: ComponentFixture<RequestStatusDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestStatusDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestStatusDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
