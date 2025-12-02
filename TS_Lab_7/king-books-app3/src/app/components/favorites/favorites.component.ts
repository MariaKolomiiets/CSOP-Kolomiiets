import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites.service';
import { Book } from '../../models/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  constructor(private favoritesService: FavoritesService) {}

  // доступ до списку favorites через async pipe
  get favorites$(): Observable<Book[]> {
    return this.favoritesService.favorites$;
  }

  // видалення книги зі списку favorites 
  remove(book: Book) {
    this.favoritesService.removeBook(book);
  }
}
