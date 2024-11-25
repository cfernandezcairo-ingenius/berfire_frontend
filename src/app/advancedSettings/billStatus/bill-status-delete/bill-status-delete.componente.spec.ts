import { TestBed, ComponentFixture } from '@angular/core/testing';
import { BillStatusDeleteComponent } from './bill-status-delete.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { BillStatusService } from '../bill-status.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import Swal from 'sweetalert2';

// Mock services
const mockTranslateService = {
  instant: jasmine.createSpy('instant').and.callFake((key: string) => key),
  currentLang: 'en',
};

const mockBillStatusService = {
  _idToDelete: 1, // Simulate the ID to delete
  delete: jasmine.createSpy('delete').and.returnValue(of({ success: true })),
};

const mockNavigationService = {
  goback: jasmine.createSpy('goback'),
};

const mockMatSnackBar = {
  open: jasmine.createSpy('open'),
};

describe('BillStatusDeleteComponent', () => {
  let component: BillStatusDeleteComponent;
  let fixture: ComponentFixture<BillStatusDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ TranslateModule.forRoot()],
      declarations: [],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: BillStatusService, useValue: mockBillStatusService },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillStatusDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and set the ID to delete', () => {
    expect(component.id).toBe(1); // Check if the ID is correctly initialized
  });

  it('should handle delete service error gracefully', async () => {
    mockBillStatusService.delete.and.returnValue(throwError(() => new Error('Error deleting'))); // Simulate an error
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any)); // Simulate confirmation
    component.delete(1);

    await fixture.whenStable(); // Wait for async actions to complete

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error' })); // Check if error alert is shown
  });

  // it('should not call delete service on user Cancel', async () => {
  //   // Simulate confirmation dialog
  //   spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false } as any));

  //   //component.delete(1);

  //   await fixture.whenStable(); // Wait for all promises to resolve

  //   // Expect delete service to be called
  //   expect(mockBillStatusService.delete).not.toHaveBeenCalled();
  // });

  it('should call delete service and show snackbar on user confirmation', async () => {
    // Simulate confirmation dialog
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));

    component.delete(1);

    await fixture.whenStable(); // Wait for all promises to resolve

    // Expect delete service to be called
    expect(mockBillStatusService.delete).toHaveBeenCalledWith(1);
  });
});
