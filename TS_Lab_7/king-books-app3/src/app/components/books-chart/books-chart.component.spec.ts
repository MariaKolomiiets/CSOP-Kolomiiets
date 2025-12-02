import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksChartComponent } from './books-chart.component';
import { Book } from '../../models/book.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';

describe('BooksChartComponent', () => {
  let component: BooksChartComponent;
  let fixture: ComponentFixture<BooksChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksChartComponent, NgxChartsModule] // імпортуємо NgxChartsModule
    }).compileComponents();

    fixture = TestBed.createComponent(BooksChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('повинен створити компонент', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnChanges оновлює chartData при зміні books', () => {
    const books: Book[] = [
      { id: 1, Title: 'Book 1', Publisher: '', Year: 2000, Pages: 100, ISBN: '', Notes: [], villains: [] },
      { id: 2, Title: 'Book 2', Publisher: '', Year: 2001, Pages: 150, ISBN: '', Notes: [], villains: [] },
      { id: 3, Title: 'Book 3', Publisher: '', Year: 2000, Pages: 200, ISBN: '', Notes: [], villains: [] }
    ];

    component.books = books;
    component.ngOnChanges({ books: { currentValue: books, previousValue: [], firstChange: true, isFirstChange: () => true } });

    expect(component.chartData).toEqual([
      { name: '2000', value: 2 },
      { name: '2001', value: 1 }
    ]);
  });

  it('chartData порожній, якщо books порожній', () => {
    component.books = [];
    component.ngOnChanges({ books: { currentValue: [], previousValue: [], firstChange: true, isFirstChange: () => true } });
    expect(component.chartData).toEqual([]);
  });

  it('chartData сортується за роками', () => {
    const books: Book[] = [
      { id: 1, Title: 'Book 1', Publisher: '', Year: 2022, Pages: 100, ISBN: '', Notes: [], villains: [] },
      { id: 2, Title: 'Book 2', Publisher: '', Year: 2019, Pages: 150, ISBN: '', Notes: [], villains: [] },
      { id: 3, Title: 'Book 3', Publisher: '', Year: 2020, Pages: 200, ISBN: '', Notes: [], villains: [] }
    ];

    component.books = books;
    component.ngOnChanges({ books: { currentValue: books, previousValue: [], firstChange: true, isFirstChange: () => true } });

    expect(component.chartData.map(d => d.name)).toEqual(['2019', '2020', '2022']);
  });
});
