// src/app/purchase-list/purchase-list.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Змінено імпорт: тепер імпортуємо PurchaseListComponent
//    з правильного файлу: './purchase-list.component'
import { PurchaseListComponent } from './purchase-list.component'; 

// 2. Змінено назву класу: 'PurchaseList' на 'PurchaseListComponent'
describe('PurchaseListComponent', () => { 
  let component: PurchaseListComponent; // Змінено тип
  let fixture: ComponentFixture<PurchaseListComponent>; // Змінено тип

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 3. Змінено імпорт: тут також використовуємо правильну назву класу
      imports: [PurchaseListComponent] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseListComponent); // Змінено створення
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});