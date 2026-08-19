import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-common-dropdown',
  standalone: false,
  templateUrl: './common-dropdown.component.html',
  styleUrl: './common-dropdown.component.css'
})
export class CommonDropdownComponent {

   @Input() label: string = 'Select';

  @Input() options: any[] = [];

  @Input() valueField: string = 'id';

  @Input() labelField: string = 'name';

  @Input() selectedValue: any = '';

  @Output() valueChange = new EventEmitter<any>();

  onSelectionChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.valueChange.emit(select.value);
  }

}
