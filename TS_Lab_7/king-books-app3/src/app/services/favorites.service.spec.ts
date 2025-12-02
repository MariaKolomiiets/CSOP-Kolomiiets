import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Book } from '../models/book.model';
import { take } from 'rxjs/operators';

// --- Мок Storage ---
class MockStorage {
  private store: Record<string, any> = {};

  async create() { return this; }
  async get(key: string) { return this.store[key]; }
  async set(key: string, value: any) { this.store[key] = value; }
}

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockStorage: MockStorage;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [FavoritesService]
    });

    service = TestBed.inject(FavoritesService);

    // замінюємо приватне сховище на мок
    mockStorage = new MockStorage();
    (service as any).storage = mockStorage;

    // чекаємо асинхронну ініціалізацію
    await service.init();
  });

  it('повинен створити сервіс', () => {
    expect(service).toBeTruthy();
  });

  it('початковий список favorites пустий', () => {
    expect(service.getFavoritesSnapshot()).toEqual([]);
    expect(service.getFavoritesSnapshot().length).toBe(0);
  });

  it('повинен додати книгу у favorites', async () => {
    const book: Book = { id: 1, title: 'Test Book' } as unknown as Book;

    await service.addBook(book);

    const snapshot = service.getFavoritesSnapshot();
    expect(snapshot).toContain(book);
    expect(snapshot.length).toBe(1);

    const stored = await mockStorage.get('favorites');
    expect(stored).toEqual([book]);
  });

  it('не повинен додавати однакову книгу двічі', async () => {
    const book: Book = { id: 1, title: 'Test Book' } as unknown as Book;

    await service.addBook(book);
    await service.addBook(book);

    const snapshot = service.getFavoritesSnapshot();
    expect(snapshot.length).toBe(1);
  });

  it('повинен видаляти книгу з favorites', async () => {
    const book: Book = { id: 1, title: 'Test Book' } as unknown as Book;

    await service.addBook(book);
    await service.removeBook(book);

    expect(service.getFavoritesSnapshot().length).toBe(0);
    const stored = await mockStorage.get('favorites');
    expect(stored).toEqual([]);
  });

  it('повинен оновлювати Observable favorites$', async () => {
    const book: Book = { id: 2, title: 'Observable Book' } as unknown as Book;

    await service.addBook(book); // чекаємо завершення додавання

    // Підписка на Observable
    service.favorites$.pipe(take(1)).subscribe((favorites) => {
        expect(favorites).toContain(book);
        expect(favorites.length).toBe(1);
    });
    });


  it('повинен підтримувати декілька книг та коректну поведінку', async () => {
    const book1: Book = { id: 1, title: 'Book 1' } as unknown as Book;
    const book2: Book = { id: 2, title: 'Book 2' } as unknown as Book;

    await service.addBook(book1);
    await service.addBook(book2);

    const snapshot = service.getFavoritesSnapshot();
    expect(snapshot.length).toBe(2);
    expect(snapshot).toContain(book1);
    expect(snapshot).toContain(book2);

    await service.removeBook(book1);
    const updated = service.getFavoritesSnapshot();
    expect(updated.length).toBe(1);
    expect(updated).not.toContain(book1);
    expect(updated).toContain(book2);
  });
});
