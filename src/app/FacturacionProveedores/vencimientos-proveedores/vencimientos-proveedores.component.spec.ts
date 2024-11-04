import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimientosProveedoresComponent } from './vencimientos-proveedores.component';

describe('VencimientosProveedoresComponent', () => {
  let component: VencimientosProveedoresComponent;
  let fixture: ComponentFixture<VencimientosProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VencimientosProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VencimientosProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
