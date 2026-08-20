import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-accordion',
  standalone: false,
  templateUrl: './common-accordion.component.html',
  styleUrl: './common-accordion.component.css'
})
export class CommonAccordionComponent {

  @Input() title: string ='';

  @Input() content: string ='';

  @Input() isOpen: boolean = false;

  @Output() toggle = new EventEmitter<void>();
  
  toggleAccordion():void{
    this.toggle.emit();
  }

  
}
