import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalsDeleteComponent } from './technicals-delete.component';

describe('TechnicalsDeleteComponent', () => {
  let component: TechnicalsDeleteComponent;
  let fixture: ComponentFixture<TechnicalsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicalsDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnicalsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
