import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {
  @Input() min = 1; // мінімальне значення

  constructor(private el: ElementRef<HTMLInputElement>) {}

  // блокує введення нецифрових символів
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (
      (event.key.length === 1 && isNaN(Number(event.key))) || 
      ['e', 'E', '+', '-'].includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  // дотримання мінімального значення після введення
  @HostListener('input')
  onInput() {
    const input = this.el.nativeElement;
    let value = parseInt(input.value, 10);
    if (isNaN(value) || value < this.min) value = this.min;
    input.value = value.toString();
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
