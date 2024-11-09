import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksDeleteComponent } from './banks-delete.component';

describe('RequestStatusDeleteComponent', () => {
  let component: BanksDeleteComponent;
  let fixture: ComponentFixture<BanksDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanksDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BanksDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
