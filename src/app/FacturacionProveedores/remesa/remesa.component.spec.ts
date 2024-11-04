import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemesaComponent } from './remesa.component';

describe('RemesaComponent', () => {
  let component: RemesaComponent;
  let fixture: ComponentFixture<RemesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemesaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
