import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceCertificateComponent } from './maintenance-certificate.component';

describe('MaintenanceCertificateComponent', () => {
  let component: MaintenanceCertificateComponent;
  let fixture: ComponentFixture<MaintenanceCertificateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaintenanceCertificateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
