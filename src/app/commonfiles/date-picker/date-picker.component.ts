import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  standalone: false,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {
  
  // @Input() label: string ='Date';
  @Input() value: string ='';
  @Input() minDate: string ='';
  @Input() maxDate: string ='';
  @Input() disableWeekends: boolean = false;
  
  @Output() valueChange = new EventEmitter<string>();

  onDateChange(event: Event): void{
     const input = event.target as HTMLInputElement;
  const selectedDate = input.value;

  if (this.disableWeekends && this.isWeekend(selectedDate)) {

    alert('Weekends are not allowed');

    this.value = '';
    this.valueChange.emit('');

    return;
  }

  this.value = selectedDate;
  this.valueChange.emit(selectedDate);  
  }

  isWeekend(date: string): boolean{
    if (!date) {
    return false;
  }

  const day = new Date(date).getDay();

  return day === 0 || day === 6;
  }
}
