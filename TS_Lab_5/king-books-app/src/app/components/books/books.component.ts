import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { Book } from '../../models/book.model';
import { BooksService } from '../../services/books.service';
import { FavoritesService } from '../../services/favorites.service';
import { BookPopupComponent } from '../book-popup/book-popup.component';
import { BooksChartComponent } from '../books-chart/books-chart.component';
import { FavoritesComponent } from '../favorites/favorites.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    BookPopupComponent,
    BooksChartComponent,
    FavoritesComponent
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = []; // масив усіх книг
  selectedBook: Book | null = null; // обрана для попапу

  constructor(
    private booksService: BooksService, 
    private favoritesService: FavoritesService
  ) {}

  // потік favorite книг (Observable)
  get favorites$() {
    return this.favoritesService.favorites$;
  }

  ngOnInit() {
    // підписка на одночасне оновлення книг та обраних
    combineLatest([
      this.booksService.getBooks().pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)) // уникаємо дублювання даних
      ),
      this.favorites$
    ]).subscribe(([books]) => {
      this.books = books; // оновлюємо масив книг
    });
  }

  // відкрити попап
  openPopup(book: Book) {
    this.selectedBook = book;
  }

  // закрити попап
  closePopup() {
    this.selectedBook = null;
  }

  // перевірка чи книга у favorites
  isFavorite(book: Book): boolean {
    return this.favoritesService
      .getFavoritesSnapshot()
      .some(b => b.id === book.id);
  }

  // додати або видалити книгу з favorites
  toggleFavorite(book: Book) {
    if (this.isFavorite(book)) {
      this.favoritesService.removeBook(book);
    } else {
      this.favoritesService.addBook(book);
    }
  }

  // trackBy для оптимізації *ngFor
  trackById(index: number, book: Book) {
    return book.id;
  }

  // видалення книги зі списку favorites
  removeFavorite(book: Book) {
    this.favoritesService.removeBook(book);
  }
}
