import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareasTecnicosComponent } from './tareas-tecnicos.component';

describe('TareasTecnicosComponent', () => {
  let component: TareasTecnicosComponent;
  let fixture: ComponentFixture<TareasTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareasTecnicosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareasTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
