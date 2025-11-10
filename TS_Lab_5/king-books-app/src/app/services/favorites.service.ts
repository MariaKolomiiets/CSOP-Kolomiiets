import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // зберігає поточний список favorites
  private favoritesSubject = new BehaviorSubject<Book[]>([]);

  // потік favorites для підписки у компонентах
  favorites$ = this.favoritesSubject.asObservable();

  // повертає Observable списку favorites
  getFavorites(): Observable<Book[]> {
    return this.favorites$;
  }

  // повертає поточний список favorites без підписки
  getFavoritesSnapshot(): Book[] {
    return this.favoritesSubject.value;
  }

  // додає книгу у favorites, якщо її ще немає
  addBook(book: Book) {
    const current = this.getFavoritesSnapshot();
    if (!current.find(b => b.id === book.id)) {
      this.favoritesSubject.next([...current, book]); // оновлюємо поточний список
    }
  }

  // видаляє книгу зі списку favorites
  removeBook(book: Book) {
    const updated = this.getFavoritesSnapshot().filter(b => b.id !== book.id);
    this.favoritesSubject.next(updated);
  }
}
