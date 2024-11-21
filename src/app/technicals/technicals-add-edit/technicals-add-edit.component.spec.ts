import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalsAddEditComponent } from './technicals-add-edit.component';

describe('WorkStatusAddEditComponent', () => {
  let component: TechnicalsAddEditComponent;
  let fixture: ComponentFixture<TechnicalsAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalsAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
