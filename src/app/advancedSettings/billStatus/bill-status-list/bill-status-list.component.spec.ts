import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillStatusListComponent } from './bill-status-list.component';
import { BillStatusService } from '../bill-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { Observable, of, Subject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

interface TranslateServiceMock {
  setDefaultLang: jasmine.Spy;
  use: jasmine.Spy;
  get: jasmine.Spy<(key: string | string[], interpolateParams?: Object) => Observable<any>>;
}

const SPANISH_LANGUAGE = 'es';
const SPANISH_TRANSLATIONS = {
  pleasantries: {
    greeting: 'Hola',
    appreciation: 'Gracias'
  }
};
const ENGLISH_LANGUAGE = 'en';
const ENGLISH_TRANSLATIONS = {
  pleasantries: {
    greeting: 'Hello',
    appreciation: 'Thank You!'
  }
};

const TRANSLATIONS = {
  [SPANISH_LANGUAGE]: SPANISH_TRANSLATIONS,
  [ENGLISH_LANGUAGE]: ENGLISH_TRANSLATIONS
};

describe('BillStatusListComponent', () => {
  let component: BillStatusListComponent;
  let fixture: ComponentFixture<BillStatusListComponent>;
  let billStatusSrv: jasmine.SpyObj<BillStatusService>;
  let matSnackBar: jasmine.SpyObj<MatSnackBar>;
  let translate: jasmine.SpyObj<TranslateService>;
  let navigationSrv: jasmine.SpyObj<NavigationService>;
  let langChangeSubject: Subject<void>;

  beforeEach(async () => {
    billStatusSrv = jasmine.createSpyObj('BillStatusService', ['getAll', 'getByFields']);
    matSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    langChangeSubject = new Subject<void>();
    translate = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'use', 'get']);
    translate.get.and.returnValue(of('Plantillas de Documentos')); // Mock return value
    Object.defineProperty(translate, 'onLangChange', { value: langChangeSubject.asObservable() });

    navigationSrv = jasmine.createSpyObj('NavigationService', ['NavigateTo']);

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        TranslateTestingModule.withTranslations(TRANSLATIONS).withDefaultLanguage('es')
      ],
      declarations: [],
      providers: [
        { provide: BillStatusService, useValue: billStatusSrv },
        { provide: MatSnackBar, useValue: matSnackBar },
        { provide: TranslateService, useValue: translate },
        { provide: NavigationService, useValue: navigationSrv },
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BillStatusListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all documents templates', () => {
    const mockData = { data: [{ id: 1, name: 'Template 1', templateType: 'Type 1', renderType: 'Render 1', predetermined: false, description: 'Description 1', template: 'Template Content' }] };
    billStatusSrv.getAll.and.returnValue(of(mockData));

    component.loadAll();

    expect(billStatusSrv.getAll).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should handle empty data when loading', () => {
    const mockData = { data: [] };
    billStatusSrv.getAll.and.returnValue(of(mockData));

    component.loadAll();

    expect(matSnackBar.open).toHaveBeenCalledWith('The data returned empty.', 'Close', Object({ duration: 2000 }));
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should handle errors when loading', () => {
    billStatusSrv.getAll.and.returnValue(of({ data: [] }));
    component.loadAll();
    expect(matSnackBar.open).toHaveBeenCalledWith('The data returned empty.', 'Close', Object({ duration: 2000 }));
  });

  it('should handle empty data when searching', () => {
    const searchEvent = { id: 0, name: 'Template 1', isPaid: false, isReturned: false, isPending: false, isSent: false, isUnPaid: false };
    const mockData = { data: [] };
    billStatusSrv.getByFields.and.returnValue(of(mockData));

    component.searchData(searchEvent);

    expect(matSnackBar.open).toHaveBeenCalledWith('The data returned empty.', 'Close', Object({ duration: 2000 }));
  });

  it('should navigate to edit page', () => {
    const row = { id: 1 };
    component.edit(row);

    expect(navigationSrv.NavigateTo).toHaveBeenCalledWith(`/invoice-status/edit/${JSON.stringify(row)}`);
  });

  it('should navigate to add page', () => {
    component.addItem();

    expect(navigationSrv.NavigateTo).toHaveBeenCalledWith('/invoice-status/edit/' + JSON.stringify({ id: 0 }));
  });

  it('should navigate to delete page', () => {
    const id = 1;
    component.delete(id);

    expect(navigationSrv.NavigateTo).toHaveBeenCalledWith(`/invoice-status/delete/${JSON.stringify(id)}`);
  });

  it('should search data correctly', () => {
    const searchEvent = { data: { id: 0, name: 'Template 1', isPaid: false, isReturned: false, isPending: false, isSent: false, isUnPaid: false } };
    const mockData = { data: [searchEvent] };
    billStatusSrv.getByFields.and.returnValue(of(mockData));

    component.searchData(searchEvent.data);

    expect(billStatusSrv.getByFields).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(1);
    expect(component.loading).toBeFalse();
  });
});

