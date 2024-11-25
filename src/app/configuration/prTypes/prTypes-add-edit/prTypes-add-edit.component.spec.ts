import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrTypesAddEditComponent } from './prTypes-add-edit.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { PrTypesService } from '../prTypes.service';
import { StyleManager } from '../../../share/services/style-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';

const mockTranslateService = {
  instant: jasmine.createSpy('instant').and.callFake((key: string) => key),
  get: jasmine.createSpy('get').and.returnValue(of({ success: true })),
  currentLang: 'en',
};

const mockPrTypesService = {
  _idToEdit: 1, // Simulate the ID to edit
  getById: jasmine.createSpy('getById').and.returnValue(of({ success: true })),
  edit: jasmine.createSpy('edit').and.returnValue(of({ success: true })),
  add: jasmine.createSpy('add').and.returnValue(of({ success: true }))
};

describe('PrTypesAddEditComponent', () => {
  let component: PrTypesAddEditComponent;
  let fixture: ComponentFixture<PrTypesAddEditComponent>;
  let routerEvents = new Subject<any>();
  let darkModeServiceSpy: jasmine.SpyObj<StyleManager>;
  let matSnackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let navigationServiceSpy: jasmine.SpyObj<NavigationService>;

  beforeEach(async () => {
    darkModeServiceSpy = jasmine.createSpyObj('StyleManager', [], { darkMode$: of(false) });
    matSnackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['goback']);

    await TestBed.configureTestingModule({
      imports: [
         BrowserAnimationsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        FormlyModule.forRoot({
          validators: [
            { name: 'required', validation: (control) => control.value ? null : { required: true } },
          ],
        }),
        FormlyMaterialModule,
      ],
      declarations: [],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: PrTypesService, useValue: mockPrTypesService },
        { provide: Router, useValue: { events: routerEvents.asObservable(), url: '/banks/edit/new' } },
        { provide: StyleManager, useValue: darkModeServiceSpy },
        { provide: MatSnackBar, useValue: matSnackBarSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: HttpClient, useValue: HttpClient },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrTypesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values and subscriptions', () => {

    component.id = 0;
    expect(component.id).toBe(0);
    expect(component.darkMode).toBe(false);
    expect(component.showinNewTab).toBe(false);
  });

  // it('should update labels when language changes', () => {
  //   mockTranslateService.get.and.returnValue(of('First Name'))
  //   component.updateLabels();
  //   expect(component.fields[0].fieldGroup[0].props.label).toBe('FORM.FIELDS.FIRSTNAME');
  // });

  it('should call the edit method of PrTypesService on new record', () => {
    component.id = 0;
    component.fg.setValue({ name: 'Test Bank', teamName: 'team 1', teamTitle: 'teamTitle 1', description: 'description 1' });
    mockPrTypesService.add.and.returnValue(of({ success: true }));
    const payload = { name: 'Test Bank', teamName: 'team 1', teamTitle: 'teamTitle 1', description: 'description 1' };
    component.onSubmit(payload);
    expect(mockPrTypesService.add).toHaveBeenCalledWith({
      name: 'Test Bank', teamName: 'team 1', teamTitle: 'teamTitle 1', description: 'description 1'
    });
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  it('should call the edit method of PrTypesService on editing a record', () => {
    component.id = 1;
    component.fg.setValue({ name: 'Test Bank', teamName: 'team 1', teamTitle: 'teamTitle 1', description: 'description 1' });
    mockPrTypesService.edit.and.returnValue(of({ success: true }));
    component.onSubmit(component.model);
    expect(mockPrTypesService.edit).toHaveBeenCalledWith({
      id: 1, name: 'Test Bank', teamName: 'team 1', teamTitle: 'teamTitle 1', description: 'description 1' });
    expect(matSnackBarSpy.open).toHaveBeenCalled();
  });

  // it('should navigate back on cancel', () => {
  //   component.showinNewTab = false;
  //   component.onCancel();
  //   expect(navigationServiceSpy.goback).toHaveBeenCalled();
  // });

  // it('should close the window if showinNewTab is true on cancel', () => {
  //   spyOn(window, 'close');
  //   component.showinNewTab = true;
  //   component.onCancel();
  //   expect(window.close).toHaveBeenCalled();
  // });
});
