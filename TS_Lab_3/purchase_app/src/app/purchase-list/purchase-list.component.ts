import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { Purchase } from '../models/purchase.model';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent {
  // список покупок, передається з батьківського компонента 
  @Input() purchases: Purchase[] = [];
  
  // надсилає батьківському компоненту ID покупки, яку потрібно видалити 
  @Output() remove = new EventEmitter<number>();

  // для оптимізації *ngFor: надає Angular purchase.id
  // щоб він перемальовував лише змінені елементи а не весь список (при видаленні наприклад)
  trackById(index: number, purchase: Purchase): number {
    return purchase.id;
  }
}
