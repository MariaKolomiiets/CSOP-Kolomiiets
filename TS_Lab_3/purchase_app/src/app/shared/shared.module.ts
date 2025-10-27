import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
  imports: [CommonModule, FormsModule, NumberOnlyDirective],
  exports: [CommonModule, FormsModule, NumberOnlyDirective]
})
export class SharedModule {}
