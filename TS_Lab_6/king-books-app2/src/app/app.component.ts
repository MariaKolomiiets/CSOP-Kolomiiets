import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './components/books/books.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BooksComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
