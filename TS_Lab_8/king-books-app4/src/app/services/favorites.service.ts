import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Book[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  private storage = new Storage();
  private storageReady = false;

  constructor() {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageReady = true;

    const stored = await this.storage.get('favorites');
    if (stored) {
      this.favoritesSubject.next(stored);
    }
  }

  getFavoritesSnapshot() {
    return this.favoritesSubject.value;
  }

  async addBook(book: Book) {
    const current = this.getFavoritesSnapshot();
    const exists = current.some(b => b.id === book.id);
    if (exists) return;

    const updated = [...current, book];
    this.favoritesSubject.next(updated);

    if (this.storageReady) {
      await this.storage.set('favorites', updated);
    }
  }

  async removeBook(book: Book) {
    const updated = this.getFavoritesSnapshot().filter(b => b.id !== book.id);
    this.favoritesSubject.next(updated);

    if (this.storageReady) {
      await this.storage.set('favorites', updated);
    }
  }
}
