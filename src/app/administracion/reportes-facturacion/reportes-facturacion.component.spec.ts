import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFacturacionComponent } from './reportes-facturacion.component';

describe('ReportesFacturacionComponent', () => {
  let component: ReportesFacturacionComponent;
  let fixture: ComponentFixture<ReportesFacturacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportesFacturacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
