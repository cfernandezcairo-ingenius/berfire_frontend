import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionCertificateComponent } from './revision-certificate.component';

describe('RevisionCertificateComponent', () => {
  let component: RevisionCertificateComponent;
  let fixture: ComponentFixture<RevisionCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisionCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisionCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
