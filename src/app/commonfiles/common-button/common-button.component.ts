import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-button',
  standalone: false,
  templateUrl: './common-button.component.html',
  styleUrl: './common-button.component.css'
})
export class CommonButtonComponent {

  @Input() label: string = 'Button';
  
  @Input() type:string = 'button';

  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  clickButton(): void{
    this.clicked.emit();
  }
}
