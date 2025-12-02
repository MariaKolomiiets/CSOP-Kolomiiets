import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-book-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-popup.component.html',
  styleUrls: ['./book-popup.component.scss']
})
export class BookPopupComponent {
  @Input() book!: Book;
  @Output() close = new EventEmitter<void>();

  constructor(private favoritesService: FavoritesService) {}

  // чи книга вже у вибраному
  isFavorite(): boolean {
    return this.favoritesService
      .getFavoritesSnapshot()
      .some(b => b.id === this.book.id);
  }

  // додавання або вилучення з favorites
  toggleFavorite() {
    if (this.isFavorite()) {
      this.favoritesService.removeBook(this.book);
    } else {
      this.favoritesService.addBook(this.book);
    }
  }

  // геттер для нотаток 
  get notesDisplay(): string {
    if (!this.book.Notes || this.book.Notes.length === 0) return 'None';
    const filtered = this.book.Notes.filter(n => n.trim() !== '');
    return filtered.length > 0 ? filtered.join(', ') : 'None';
  }

  // геттер для villains
  get villainsDisplay(): string {
    if (!this.book.villains || this.book.villains.length === 0) return 'None';
    const filtered = this.book.villains
      .filter(v => v.name && v.name.trim() !== '')
      .map(v => v.name);
    return filtered.length > 0 ? filtered.join(', ') : 'None';
  }
}
