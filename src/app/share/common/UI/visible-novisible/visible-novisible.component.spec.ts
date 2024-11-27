import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleNovisibleComponent } from './visible-novisible.component';

describe('VisibleNovisibleComponent', () => {
  let component: VisibleNovisibleComponent;
  let fixture: ComponentFixture<VisibleNovisibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisibleNovisibleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibleNovisibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
