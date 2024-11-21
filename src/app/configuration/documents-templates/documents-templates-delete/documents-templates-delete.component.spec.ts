import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTemplatesDeleteComponent } from './documents-templates-delete.component';

describe('DocumentsTemplatesDeleteComponent', () => {
  let component: DocumentsTemplatesDeleteComponent;
  let fixture: ComponentFixture<DocumentsTemplatesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsTemplatesDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsTemplatesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
