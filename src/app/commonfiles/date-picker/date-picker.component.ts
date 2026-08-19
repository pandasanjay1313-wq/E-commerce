import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: false,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  
  @Input() label: string ='Date';
  @Input() value: string ='';
  @Input() minDate: string ='';
  @Input() maxDate: string ='';

  @Output() dateChange = new EventEmitter<string>();

  onDateChange(event: Event): void{
    const input = event.target as HTMLInputElement;
    this.dateChange.emit(input.value);
  }
}
