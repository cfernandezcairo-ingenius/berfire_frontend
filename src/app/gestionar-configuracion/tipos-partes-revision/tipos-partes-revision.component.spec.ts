import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposPartesRevisionComponent } from './tipos-partes-revision.component';

describe('TiposPartesRevisionComponent', () => {
  let component: TiposPartesRevisionComponent;
  let fixture: ComponentFixture<TiposPartesRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiposPartesRevisionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiposPartesRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
