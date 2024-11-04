import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasRevisionesComponent } from './ultimas-revisiones.component';

describe('UltimasRevisionesComponent', () => {
  let component: UltimasRevisionesComponent;
  let fixture: ComponentFixture<UltimasRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UltimasRevisionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UltimasRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
