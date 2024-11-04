import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableMobileComponent } from './mat-table-mobile.component';

describe('MatTableMobileComponent', () => {
  let component: MatTableMobileComponent;
  let fixture: ComponentFixture<MatTableMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableMobileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
