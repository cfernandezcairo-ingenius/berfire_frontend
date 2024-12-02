import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallCertificationComponent } from './install-certification.component';

describe('InstallCertificationComponent', () => {
  let component: InstallCertificationComponent;
  let fixture: ComponentFixture<InstallCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallCertificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
