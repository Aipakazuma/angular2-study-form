import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appThinkForm]'
})
export class ThinkFormDirective {

  constructor(private elementRef: ElementRef) {
    console.log(this.elementRef);
  }
}
