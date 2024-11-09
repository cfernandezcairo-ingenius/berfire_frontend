import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosAlbaranesEntregasListComponent } from './estados-albaranes-entregas-list.component';

describe('EstadosAlbaranesEntregasListComponent', () => {
  let component: EstadosAlbaranesEntregasListComponent;
  let fixture: ComponentFixture<EstadosAlbaranesEntregasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosAlbaranesEntregasListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosAlbaranesEntregasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
