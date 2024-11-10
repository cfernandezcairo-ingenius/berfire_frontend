import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposClienteComponent } from './tipos-cliente.component';

describe('TiposClienteComponent', () => {
  let component: TiposClienteComponent;
  let fixture: ComponentFixture<TiposClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
