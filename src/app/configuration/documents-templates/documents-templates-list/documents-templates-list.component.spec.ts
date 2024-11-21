import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsTemplatesListComponent } from './documents-templates-list.component';

describe('EstadosAlbaranesEntregasDeleteComponent', () => {
  let component: DocumentsTemplatesListComponent;
  let fixture: ComponentFixture<DocumentsTemplatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsTemplatesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
