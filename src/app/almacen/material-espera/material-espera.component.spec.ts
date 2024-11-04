import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialEsperaComponent } from './material-espera.component';

describe('MaterialEsperaComponent', () => {
  let component: MaterialEsperaComponent;
  let fixture: ComponentFixture<MaterialEsperaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialEsperaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
