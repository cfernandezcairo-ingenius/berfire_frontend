import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasCompraComponent } from './propuestas-compra.component';

describe('PropuestasCompraComponent', () => {
  let component: PropuestasCompraComponent;
  let fixture: ComponentFixture<PropuestasCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropuestasCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropuestasCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
