import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportesFacturadosComponent } from './importes-facturados.component';

describe('ImportesFacturadosComponent', () => {
  let component: ImportesFacturadosComponent;
  let fixture: ComponentFixture<ImportesFacturadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportesFacturadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportesFacturadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
