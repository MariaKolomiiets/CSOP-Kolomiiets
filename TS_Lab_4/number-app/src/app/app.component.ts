import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ChildComponent } from './child/child.component'; 

//батьківський компонент
@Component({
  selector: 'app-root',
  standalone: true,    
  imports: [FormsModule, ChildComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputValue: string = ''; //рядок
  numbers: number[] = []; //масив чисел
  errorMessage: string = ''; //помилка

  //метод викликається при зміні тексту
  //перевіряє правильність і формує масив чисел
  updateNumbers() {
  this.errorMessage = '';
  if (!this.inputValue.trim()) {
    this.numbers = [];
    return;
  }

  //розбиваємо введений рядок на числа
  const nums = this.inputValue
    .split(',') //ділимо за комами
    .map(x => x.trim()) //вирізаємо пробіли
    .filter(x => x !== '')    // пропускаємо порожні елементи
    .map(x => Number(x)); //перетворення на числа

  //якщо є не числа - помилка
  if (nums.some(isNaN)) {
    this.errorMessage = 'Всі введені значення повинні бути числами';
    this.numbers = [];
    return;
  }
  //зберігаємо масив числе
  this.numbers = nums;
}
}
