import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRectificativasComponent } from './gestionar-rectificativas.component';

describe('GestionarRectificativasComponent', () => {
  let component: GestionarRectificativasComponent;
  let fixture: ComponentFixture<GestionarRectificativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarRectificativasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarRectificativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
