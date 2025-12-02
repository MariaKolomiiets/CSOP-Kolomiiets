import { TestBed } from '@angular/core/testing';
import { BooksService } from './books.service';
import { Book, Villain } from '../models/book.model';
import axios from 'axios';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksService]
    });
    service = TestBed.inject(BooksService);
  });

  it('повинен створити сервіс', () => {
    expect(service).toBeTruthy();
  });

  it('getBooks повинен повертати список книг', (done) => {
    const mockBooks: Book[] = [
      {
        id: 1,
        Title: 'Book 1',
        Publisher: 'Publisher 1',
        Year: 2023,
        Pages: 200,
        ISBN: '1234567890',
        Notes: ['note1'],
        villains: [{ name: 'Villain 1' }]
      },
      {
        id: 2,
        Title: 'Book 2',
        Publisher: 'Publisher 2',
        Year: 2022,
        Pages: 300,
        ISBN: '0987654321',
        Notes: ['note2'],
        villains: []
      }
    ];

    spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { data: mockBooks } }));

    service.getBooks().subscribe((books) => {
      // --- різні типи матчингів ---
      expect(books).toBeDefined();
      expect(books.length).toBe(2);
      expect(books).toEqual(mockBooks);
      expect(books).toContain(mockBooks[0]);
      expect(typeof books[0].Title).toBe('string');
      expect(books[1].villains.length).toBe(0);
      expect(books[0].Notes).toContain('note1');
      done();
    });
  });

  it('getBooks не повинен повертати порожній масив, якщо є дані', (done) => {
    const mockBooks: Book[] = [
      {
        id: 1,
        Title: 'Book 1',
        Publisher: 'Publisher 1',
        Year: 2023,
        Pages: 200,
        ISBN: '1234567890',
        Notes: [],
        villains: []
      }
    ];

    spyOn(axios, 'get').and.returnValue(Promise.resolve({ data: { data: mockBooks } }));

    service.getBooks().subscribe((books) => {
      expect(books.length).not.toBe(0);
      expect(books).not.toEqual([]);
      done();
    });
  });

  it('getBooks повинен обробляти помилку', (done) => {
    const error = new Error('Network error');

    spyOn(axios, 'get').and.returnValue(Promise.reject(error));

    service.getBooks().subscribe({
      next: () => fail('Observable повинен кинути помилку'),
      error: (err) => {
        expect(err).toBe(error);
        done();
      }
    });
  });

  it('можна перевіряти кілька викликів axios', (done) => {
    const mockBooks1: Book[] = [
      {
        id: 1,
        Title: 'Book 1',
        Publisher: 'Publisher 1',
        Year: 2023,
        Pages: 200,
        ISBN: '123',
        Notes: [],
        villains: []
      }
    ];
    const mockBooks2: Book[] = [
      {
        id: 2,
        Title: 'Book 2',
        Publisher: 'Publisher 2',
        Year: 2022,
        Pages: 300,
        ISBN: '456',
        Notes: [],
        villains: []
      }
    ];

    const spy = spyOn(axios, 'get').and.returnValues(
      Promise.resolve({ data: { data: mockBooks1 } }),
      Promise.resolve({ data: { data: mockBooks2 } })
    );

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks1);
    });

    service.getBooks().subscribe((books) => {
      expect(books).toEqual(mockBooks2);
      expect(spy).toHaveBeenCalledTimes(2);
      done();
    });
  });

});