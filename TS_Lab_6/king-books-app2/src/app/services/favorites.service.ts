import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  // BehaviorSubject зберігає поточний список вибраних книг
  // (так само як у старому варіанті)
  private favoritesSubject = new BehaviorSubject<Book[]>([]);

  // Observable для підписки компонентів
  favorites$ = this.favoritesSubject.asObservable();

  //  створюємо екземпляр Ionic Storage
  private storage = new Storage();

  // прапорець, який показує чи storage вже готове
  private storageReady = false;

  constructor() {
    //  ініціалізація storage одразу при створенні сервісу
    this.init();
  }

  //  асинхронна ініціалізація Ionic Storage
  // створює базу даних та завантажує favorites, якщо вони існують
  async init() {
    await this.storage.create();  // створюємо локальне сховище
    this.storageReady = true;

    // читаємо збережені favorites (якщо вони були)
    const stored = await this.storage.get('favorites');
    if (stored) {
      // відновлюємо дані в BehaviorSubject після перезавантаження сторінки
      this.favoritesSubject.next(stored);
    }
  }

  // повертає поточний список favorites без Observable
  getFavoritesSnapshot() {
    return this.favoritesSubject.value;
  }

  // додає книгу у favorites
  // тепер також зберігає її у Ionic Storage
  async addBook(book: Book) {
    const current = this.getFavoritesSnapshot();

    // перевіряємо, чи книга вже існує
    const exists = current.some(b => b.id === book.id);
    if (exists) return;

    // додаємо книгу у BehaviorSubject
    const updated = [...current, book];
    this.favoritesSubject.next(updated);

    //  запис у стороннє сховище
    if (this.storageReady) {
      await this.storage.set('favorites', updated);
    }
  }

  // видаляє книгу з favorites
  // також оновлює локальне сховище
  async removeBook(book: Book) {
    const updated = this.getFavoritesSnapshot().filter(b => b.id !== book.id);

    // оновлюємо BehaviorSubject
    this.favoritesSubject.next(updated);

    //  оновлюємо збережений список у storage
    if (this.storageReady) {
      await this.storage.set('favorites', updated);
    }
  }
}
