import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from '../../services/favorites.service';
import { Book } from '../../models/book.model';
import { BehaviorSubject, of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockFavoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    // Створюємо мок сервісу
    mockFavoritesService = jasmine.createSpyObj('FavoritesService', ['removeBook'], {
      favorites$: new BehaviorSubject<Book[]>([])
    });

    await TestBed.configureTestingModule({
      imports: [FavoritesComponent],
      providers: [
        { provide: FavoritesService, useValue: mockFavoritesService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('favorites$ повинен відображати список книг з сервісу', (done) => {
    const mockBooks: Book[] = [
      { id: 1, Title: 'Book 1', Publisher: 'P1', Year: 2023, Pages: 200, ISBN: '123', Notes: [], villains: [] },
      { id: 2, Title: 'Book 2', Publisher: 'P2', Year: 2022, Pages: 300, ISBN: '456', Notes: [], villains: [] }
    ];

    // Оновлюємо BehaviorSubject сервісу
    (mockFavoritesService.favorites$ as BehaviorSubject<Book[]>).next(mockBooks);

    component.favorites$.subscribe((books) => {
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
      expect(books[0].Title).toBe('Book 1');
      done();
    });
  });

  it('remove викликає removeBook сервісу', () => {
    const book: Book = { id: 1, Title: 'Book 1', Publisher: 'P1', Year: 2023, Pages: 200, ISBN: '123', Notes: [], villains: [] };
    component.remove(book);
    expect(mockFavoritesService.removeBook).toHaveBeenCalledWith(book);
    expect(mockFavoritesService.removeBook).toHaveBeenCalledTimes(1);
  });

  it('favorites$ може бути пустим', (done) => {
    (mockFavoritesService.favorites$ as BehaviorSubject<Book[]>).next([]);
    component.favorites$.subscribe((books) => {
      expect(books).toEqual([]);
      expect(books.length).toBe(0);
      done();
    });
  });
});
