import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Modelos347Component } from './modelos-347.component';

describe('Modelos347Component', () => {
  let component: Modelos347Component;
  let fixture: ComponentFixture<Modelos347Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Modelos347Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Modelos347Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
