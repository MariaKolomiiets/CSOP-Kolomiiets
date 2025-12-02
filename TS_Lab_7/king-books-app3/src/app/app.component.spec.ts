import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BooksComponent } from './components/books/books.component';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, CommonModule, BooksComponent] // standalone компоненти
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // запускаємо lifecycle hooks
  });

  it('повинен створити AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('повинен рендерити шаблон', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeDefined();
  });

  it('повинен містити BooksComponent у DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const booksElement = compiled.querySelector('app-books'); // selector BooksComponent
    expect(booksElement).toBeTruthy(); // перевіряємо, що компонент присутній
  });
});
