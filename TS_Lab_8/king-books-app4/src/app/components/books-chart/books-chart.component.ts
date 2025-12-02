import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.model';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-books-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './books-chart.component.html',
  styleUrls: ['./books-chart.component.scss']
})
export class BooksChartComponent implements OnChanges {
  @Input() books: Book[] = [];

  chartData: { name: string; value: number }[] = [];

  view: [number, number] = [700, 300];
  showXAxis = true;  
  showYAxis = true;   
  gradient = false;  
  showLegend = false; 
  showXAxisLabel = true; 
  xAxisLabel = 'Year';
  showYAxisLabel = true; 
  yAxisLabel = 'Number of Books';
  colorScheme = 'vivid';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['books']) {
      this.updateChart();
    }
  }

  private updateChart() {
    const counts: Record<number, number> = {};
    this.books.forEach(book => {
      counts[book.Year] = (counts[book.Year] || 0) + 1;
    });

    this.chartData = Object.entries(counts)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([year, count]) => ({ name: year, value: count }));
  }
}
