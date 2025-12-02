import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private apiUrl = 'https://stephen-king-api.onrender.com/api/books';

  constructor() {}

  getBooks(): Observable<Book[]> {
    // axios повертає Promise — перетворюємо його в Observable через from()
    return from(axios.get<{ data: Book[] }>(this.apiUrl)).pipe(
      // вибираємо тільки поле data з відповіді API
      map(response => response.data.data)
    );
  }
}
