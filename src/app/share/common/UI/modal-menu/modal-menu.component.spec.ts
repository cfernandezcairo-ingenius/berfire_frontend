import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMenuComponent } from './modal-menu.component';

describe('ModalMenuComponent', () => {
  let component: ModalMenuComponent;
  let fixture: ComponentFixture<ModalMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
