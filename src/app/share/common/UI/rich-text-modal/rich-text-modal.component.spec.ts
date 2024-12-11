import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RichTextModalComponent } from './rich-text-modal.component';

describe('RichTextModalComponent', () => {
  let component: RichTextModalComponent;
  let fixture: ComponentFixture<RichTextModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RichTextModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RichTextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
