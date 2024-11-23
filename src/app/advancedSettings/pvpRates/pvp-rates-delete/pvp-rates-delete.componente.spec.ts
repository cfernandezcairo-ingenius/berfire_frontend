import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PvpRatesDeleteComponent } from './pvp-rates-delete.component';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { PVPRatesService } from '../pvp-rates.service';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import Swal from 'sweetalert2';

// Mock services
const mockTranslateService = {
  instant: jasmine.createSpy('instant').and.callFake((key: string) => key),
  currentLang: 'en',
};

const mockPVPRatesService = {
  _idToDelete: 1, // Simulate the ID to delete
  delete: jasmine.createSpy('delete').and.returnValue(of({ success: true })),
};

const mockNavigationService = {
  goback: jasmine.createSpy('goback'),
};

const mockMatSnackBar = {
  open: jasmine.createSpy('open'),
};

describe('PvpRatesDeleteComponent', () => {
  let component: PvpRatesDeleteComponent;
  let fixture: ComponentFixture<PvpRatesDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ TranslateModule.forRoot()],
      declarations: [],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: PVPRatesService, useValue: mockPVPRatesService },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: MatSnackBar, useValue: mockMatSnackBar },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PvpRatesDeleteComponent);
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
    mockPVPRatesService.delete.and.returnValue(throwError(() => new Error('Error deleting'))); // Simulate an error
    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true } as any)); // Simulate confirmation
    component.delete(1);

    await fixture.whenStable(); // Wait for async actions to complete

    expect(Swal.fire).toHaveBeenCalledWith(jasmine.objectContaining({ icon: 'error' })); // Check if error alert is shown
  });
});
