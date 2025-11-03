import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

//компонент нащадок
@Component({
  selector: 'child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() numbers: number[] = []; //приймає масив чисел від батьківського компонента

  arithmeticMean: number | null = null;
  geometricMean: number | null = null;

  ngOnChanges(): void {   //метод спрацьовує при кожній зміні вхідних даних
    //перевіряємо чи масив чисел існує і містить принаймні два елементи
    if (!this.numbers || this.numbers.length < 2) {
      this.arithmeticMean = null;
      this.geometricMean = null;
      return;
    }

    //обчислення середнього арифметичного кубів max і min
    const max = Math.max(...this.numbers);
    const min = Math.min(...this.numbers);
    this.arithmeticMean = (Math.pow(max, 3) + Math.pow(min, 3)) / 2;

    //обчислення середнього геометричного модулів всіх чисел
    const productOfAbs = this.numbers.reduce((prod, n) => prod * Math.abs(n), 1);
    this.geometricMean = Math.pow(productOfAbs, 1 / this.numbers.length);
  }
}
