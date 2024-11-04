import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormasPagosComponent } from './formas-pagos.component';

describe('FormasPagosComponent', () => {
  let component: FormasPagosComponent;
  let fixture: ComponentFixture<FormasPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormasPagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormasPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
