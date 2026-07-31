import { Directive,ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class Highlight {
  @Input() color = '';
  @Input() appBackground= '';


  @HostBinding('style.border')
  border = '2px solid black';
  constructor(private element: ElementRef) {}

  ngOnInit(){
     this.element.nativeElement.style.backgroundColor = this.appBackground;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.element.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.element.nativeElement.style.backgroundColor = '';
  }   
}