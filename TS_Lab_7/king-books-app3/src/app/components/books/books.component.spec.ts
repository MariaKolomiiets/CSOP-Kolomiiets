import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksComponent } from './books.component';
import { BooksService } from '../../services/books.service';
import { FavoritesService } from '../../services/favorites.service';
import { BehaviorSubject, of } from 'rxjs';
import { Book } from '../../models/book.model';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; // <-- додати

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let mockBooksService: jasmine.SpyObj<BooksService>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;

  const mockBooks: Book[] = [
    { id: 1, Title: 'Book 1', Publisher: '', Year: 2000, Pages: 100, ISBN: '', Notes: [], villains: [] },
    { id: 2, Title: 'Book 2', Publisher: '', Year: 2001, Pages: 150, ISBN: '', Notes: [], villains: [] }
  ];

  beforeEach(async () => {
    mockBooksService = jasmine.createSpyObj('BooksService', ['getBooks']);
    mockBooksService.getBooks.and.returnValue(of(mockBooks));

    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['addBook', 'removeBook'], {
      favorites$: new BehaviorSubject<Book[]>([])
    });
    mockFavoritesService.getFavoritesSnapshot = jasmine.createSpy('getFavoritesSnapshot').and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [BooksComponent],
      providers: [
        { provide: BooksService, useValue: mockBooksService },
        { provide: FavoritesService, useValue: mockFavoritesService },
        provideNoopAnimations() // <-- ось тут додаємо
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit має підписатися на getBooks і favorites$', () => {
    expect(mockBooksService.getBooks).toHaveBeenCalled();
    expect(component.books.length).toBe(2);
    expect(component.books).toEqual(mockBooks);
  });

  it('openPopup і closePopup працюють правильно', () => {
    component.openPopup(mockBooks[0]);
    expect(component.selectedBook).toBe(mockBooks[0]);

    component.closePopup();
    expect(component.selectedBook).toBeNull();
  });

  it('isFavorite повертає true або false коректно', () => {
    // спочатку у favorites немає книг
    expect(component.isFavorite(mockBooks[0])).toBeFalse();

    // мок повертає книгу у favorites
    mockFavoritesService.getFavoritesSnapshot.and.returnValue([mockBooks[0]]);
    expect(component.isFavorite(mockBooks[0])).toBeTrue();
  });

  it('toggleFavorite викликає addBook або removeBook відповідно', () => {
    // книга не у favorites
    component.toggleFavorite(mockBooks[0]);
    expect(mockFavoritesService.addBook).toHaveBeenCalledWith(mockBooks[0]);

    // мок повертає книгу у favorites
    mockFavoritesService.getFavoritesSnapshot.and.returnValue([mockBooks[0]]);
    component.toggleFavorite(mockBooks[0]);
    expect(mockFavoritesService.removeBook).toHaveBeenCalledWith(mockBooks[0]);
  });

  it('trackById повертає id книги', () => {
    const id = component.trackById(0, mockBooks[1]);
    expect(id).toBe(2);
  });

  it('removeFavorite викликає removeBook сервісу', () => {
    component.removeFavorite(mockBooks[1]);
    expect(mockFavoritesService.removeBook).toHaveBeenCalledWith(mockBooks[1]);
  });

});
