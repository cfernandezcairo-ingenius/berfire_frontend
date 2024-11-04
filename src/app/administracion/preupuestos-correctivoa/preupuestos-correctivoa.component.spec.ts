import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreupuestosCorrectivoaComponent } from './preupuestos-correctivoa.component';

describe('PreupuestosCorrectivoaComponent', () => {
  let component: PreupuestosCorrectivoaComponent;
  let fixture: ComponentFixture<PreupuestosCorrectivoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreupuestosCorrectivoaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreupuestosCorrectivoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
