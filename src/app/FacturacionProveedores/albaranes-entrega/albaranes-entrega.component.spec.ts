import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbaranesEntregaComponent } from './albaranes-entrega.component';

describe('AlbaranesEntregaComponent', () => {
  let component: AlbaranesEntregaComponent;
  let fixture: ComponentFixture<AlbaranesEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbaranesEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbaranesEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
