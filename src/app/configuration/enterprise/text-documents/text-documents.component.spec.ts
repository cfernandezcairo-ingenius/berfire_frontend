import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextDocumentsComponent } from './text-documents.component';

describe('TextDocumentsComponent', () => {
  let component: TextDocumentsComponent;
  let fixture: ComponentFixture<TextDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
