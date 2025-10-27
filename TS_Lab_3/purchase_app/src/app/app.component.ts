import { Component } from '@angular/core';
import { PurchaseSumComponent } from './purchase-sum/purchase-sum.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { Purchase } from './models/purchase.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PurchaseSumComponent, PurchaseListComponent],
  template: `
    <main class="container">
      <h1>Покупки</h1>

      <app-purchase-sum 
        (add)="onAdd($event)" 
        [total]="total">
      </app-purchase-sum>
      
      <app-purchase-list 
        [purchases]="purchases" 
        (remove)="onRemove($event)">
      </app-purchase-list>
    </main>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 20px auto;
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
    }
  `]
})
export class AppComponent {
  purchases: Purchase[] = [];
  private nextId = 1; // лічильник для ID

  // загальна сума покупок
  get total(): number {
    return this.purchases.reduce((sum, p) => sum + p.price * p.quantity, 0);
  }

  // додає нову покупку
  onAdd(newPurchase: { name: string, price: number, quantity: number }) {
    const purchaseWithId: Purchase = {
      ...newPurchase,
      id: this.nextId++
    };
    this.purchases.push(purchaseWithId);
  }

  // видаляє покупку за ID 
  onRemove(id: number) {
    this.purchases = this.purchases.filter(p => p.id !== id);
  }
}
