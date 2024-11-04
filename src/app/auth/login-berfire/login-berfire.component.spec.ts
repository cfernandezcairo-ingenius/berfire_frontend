import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBerfireComponent } from './login-berfire.component';

describe('LoginBerfireComponent', () => {
  let component: LoginBerfireComponent;
  let fixture: ComponentFixture<LoginBerfireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBerfireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBerfireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
