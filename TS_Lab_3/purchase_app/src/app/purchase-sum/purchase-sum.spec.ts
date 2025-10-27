// src/app/purchase-sum/purchase-sum.spec.ts (Виправлена версія)

import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Виправлено імпорт: посилаємося на компонентний файл
import { PurchaseSumComponent } from './purchase-sum.component'; 

// 2. Змінено назву класу та тип
describe('PurchaseSumComponent', () => {
  let component: PurchaseSumComponent; 
  let fixture: ComponentFixture<PurchaseSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Використовуємо правильну назву класу компонента
      imports: [PurchaseSumComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});