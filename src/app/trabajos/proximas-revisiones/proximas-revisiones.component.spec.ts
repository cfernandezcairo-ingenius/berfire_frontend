import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProximasRevisionesComponent } from './proximas-revisiones.component';

describe('ProximasRevisionesComponent', () => {
  let component: ProximasRevisionesComponent;
  let fixture: ComponentFixture<ProximasRevisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProximasRevisionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProximasRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
