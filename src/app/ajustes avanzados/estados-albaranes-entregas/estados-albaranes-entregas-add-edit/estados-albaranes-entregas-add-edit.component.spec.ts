import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosAlbaranesEntregasAddEditComponent } from './estados-albaranes-entregas-add-edit.component';

describe('EstadosAlbaranesEntregasAddEditComponent', () => {
  let component: EstadosAlbaranesEntregasAddEditComponent;
  let fixture: ComponentFixture<EstadosAlbaranesEntregasAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosAlbaranesEntregasAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosAlbaranesEntregasAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
