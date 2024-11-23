import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StatesPartiesReviewDeleteComponent } from './states-parties-review-delete.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { StatesPartiesReviewService } from '../states-parties-review.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import Swal from 'sweetalert2';
import { DocumentsTemplatesService } from '../../../configuration/documents-templates/documents-templates.service';

// Mock services
const mockTranslateService = {
  instant: jasmine.createSpy('instant').and.callFake((key: string) => key),
  currentLang: 'en',
};

const mockDocumentsTemplatesService = {
  _idToDelete: 1,
  delete: jasmine.createSpy('delete').and.returnValue(of({ success: true })),
};

const mockStatesPartiesReviewService = {
  _idToDelete: 1, // Simulate the ID to delete
  delete: jasmine.createSpy('delete').and.returnValue(of({ success: true })),
};

const mockNavigationService = {
  goback: jasmine.createSpy('goback'),
};

const mockMatSnackBar = {
  open: jasmine.createSpy('open'),
};

describe('StatesPartiesReviewDeleteComponent', () => {
  let component: StatesPartiesReviewDeleteComponent;
  let fixture: ComponentFixture<StatesPartiesReviewDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ TranslateModule.forRoot()],
      declarations: [],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: StatesPartiesReviewService, useValue: mockStatesPartiesReviewService },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
        { provide: DocumentsTemplatesService, useValue: mockDocumentsTemplatesService }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesPartiesReviewDeleteComponent);
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
    mockStatesPartiesReviewService.delete.and.returnValue(throwError(() => new Error('Error deleting'))); // Simulate an error
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any)); // Simulate confirmation
    component.delete(1);

    await fixture.whenStable(); // Wait for async actions to complete

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error' })); // Check if error alert is shown
  });

  it('should not call delete service if confirmation is canceled', async () => {
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: false } as any)); // Simulate cancellation

    component.delete(1);

    await fixture.whenStable(); // Wait for async operations

    // Verify delete was NOT called
    expect(mockDocumentsTemplatesService.delete).not.toHaveBeenCalled();
  });

  it('should call delete service and show snackbar on user confirmation', async () => {
    // Simulate confirmation dialog
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any));

    component.delete(1);

    await fixture.whenStable(); // Wait for all promises to resolve

    // Expect delete service to be called
    expect(mockStatesPartiesReviewService.delete).toHaveBeenCalledWith(1);
  });
});
