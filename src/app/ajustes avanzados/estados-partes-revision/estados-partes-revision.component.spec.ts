import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadosPartesRevisionComponent } from './estados-partes-revision.component';

describe('EstadosPartesRevisionComponent', () => {
  let component: EstadosPartesRevisionComponent;
  let fixture: ComponentFixture<EstadosPartesRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadosPartesRevisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadosPartesRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
