import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-accordion',
  standalone: false,
  templateUrl: './common-accordion.component.html',
  styleUrl: './common-accordion.component.css'
})
export class CommonAccordionComponent {

  @Input() title: string ='';

  @Input() content: string ='';

  isOpen:   boolean= false;
  
  toggleAccordion():void{
    this.isOpen =!this.isOpen;
  }

  
}
