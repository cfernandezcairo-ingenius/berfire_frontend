import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTemplatesAddEditComponent } from './documents-templates-add-edit.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: DocumentsTemplatesAddEditComponent;
  let fixture: ComponentFixture<DocumentsTemplatesAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsTemplatesAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsTemplatesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
