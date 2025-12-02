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
  books: Book[] = [];
  selectedBook: Book | null = null;

  constructor(
    private booksService: BooksService, 
    private favoritesService: FavoritesService
  ) {}

  get favorites$() {
    return this.favoritesService.favorites$;
  }

  ngOnInit() {
    combineLatest([
      this.booksService.getBooks().pipe(
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      ),
      this.favorites$
    ]).subscribe(([books]) => {
      this.books = books;
    });
  }

  openPopup(book: Book) {
    this.selectedBook = book;
  }

  closePopup() {
    this.selectedBook = null;
  }

  isFavorite(book: Book): boolean {
    return this.favoritesService
      .getFavoritesSnapshot()
      .some(b => b.id === book.id);
  }

  toggleFavorite(book: Book) {
    // Патерн Command: дія (додати/видалити) над Book
    if (this.isFavorite(book)) {
      this.favoritesService.removeBook(book);
    } else {
      this.favoritesService.addBook(book);
    }
  }

  trackById(index: number, book: Book) {
    return book.id;
  }

  removeFavorite(book: Book) {
    this.favoritesService.removeBook(book);
  }
}
