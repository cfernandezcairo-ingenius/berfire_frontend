import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidasCuotasComponent } from './subidas-cuotas.component';

describe('SubidasCuotasComponent', () => {
  let component: SubidasCuotasComponent;
  let fixture: ComponentFixture<SubidasCuotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubidasCuotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubidasCuotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
