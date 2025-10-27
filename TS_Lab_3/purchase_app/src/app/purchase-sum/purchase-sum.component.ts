import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-purchase-sum',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './purchase-sum.component.html',
  styleUrls: ['./purchase-sum.component.scss']
})
export class PurchaseSumComponent {
  @Input() total = 0; // загальна сума передана зб атьківського компонента
  @Output() add = new EventEmitter<{ name: string, price: number, quantity: number }>();

  @ViewChild('purchaseForm') purchaseForm!: NgForm; // для скидання полів

  name = '';            
  price: number | null = null; 
  quantity = 1;           

  // додаємо нову покупку
  addPurchase() {
    const name = this.name.trim();
    const price = Number(this.price);      
    const quantity = Math.floor(Number(this.quantity)) || 1;

    if (!name || price <= 0 || quantity <= 0) return;

    // надсилаємо дані батьківському компоненту
    this.add.emit({ name, price, quantity });

    // скидаємо форму після додавання
    this.purchaseForm.resetForm({ quantity: 1 });
    this.name = '';
    this.price = null;
    this.quantity = 1;
  }
}
