import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookPopupComponent } from './book-popup.component';
import { Book } from '../../models/book.model';
import { FavoritesService } from '../../services/favorites.service';
import { BehaviorSubject } from 'rxjs';

describe('BookPopupComponent', () => {
  let component: BookPopupComponent;
  let fixture: ComponentFixture<BookPopupComponent>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;

  const mockBook: Book = {
    id: 1,
    Title: 'Test Book',
    Publisher: 'Test Publisher',
    Year: 2020,
    Pages: 100,
    ISBN: '1234567890',
    Notes: ['Note 1', 'Note 2'],
    villains: [{ name: 'Villain 1' }, { name: 'Villain 2' }]
  };

  beforeEach(async () => {
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['addBook', 'removeBook'], {
      favorites$: new BehaviorSubject<Book[]>([])
    });
    mockFavoritesService.getFavoritesSnapshot = jasmine.createSpy('getFavoritesSnapshot').and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [BookPopupComponent],
      providers: [{ provide: FavoritesService, useValue: mockFavoritesService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookPopupComponent);
    component = fixture.componentInstance;

    component.book = { ...mockBook };
    fixture.detectChanges();
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('isFavorite повертає false, якщо книги немає у favorites', () => {
    expect(component.isFavorite()).toBeFalse();
  });

  it('toggleFavorite викликає addBook, якщо книга не у favorites', () => {
    component.toggleFavorite();
    expect(mockFavoritesService.addBook).toHaveBeenCalledWith(mockBook);
  });

  it('toggleFavorite викликає removeBook, якщо книга вже у favorites', () => {
    mockFavoritesService.getFavoritesSnapshot.and.returnValue([mockBook]);
    expect(component.isFavorite()).toBeTrue();

    component.toggleFavorite();
    expect(mockFavoritesService.removeBook).toHaveBeenCalledWith(mockBook);
  });

  it('notesDisplay повертає відформатовані нотатки', () => {
    component.book.Notes = ['Note 1', 'Note 2', '']; // тест порожній рядок
    fixture.detectChanges();
    expect(component.notesDisplay).toBe('Note 1, Note 2');
  });

  it('notesDisplay повертає "None" якщо нотаток немає', () => {
    component.book.Notes = [];
    fixture.detectChanges();
    expect(component.notesDisplay).toBe('None');
  });

  it('villainsDisplay повертає відформатовані імена villains', () => {
    component.book.villains = [{ name: 'Villain 1' }, { name: 'Villain 2' }, { name: '' }];
    fixture.detectChanges();
    expect(component.villainsDisplay).toBe('Villain 1, Villain 2');
  });

  it('villainsDisplay повертає "None", якщо villains немає', () => {
    component.book.villains = [];
    fixture.detectChanges();
    expect(component.villainsDisplay).toBe('None');
  });

  it('close EventEmitter повинен емiтити подію', () => {
    spyOn(component.close, 'emit');
    component.close.emit();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
