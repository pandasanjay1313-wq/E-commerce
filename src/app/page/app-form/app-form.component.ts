import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppformService } from '../../services/appform.service';

@Component({
  selector: 'app-app-form',
  standalone: false,
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.css'
})
export class AppFormComponent implements OnInit {
  @Input() jsonFile!: string;
  form!: FormGroup;
  config: any;

  constructor(private http: HttpClient, private appformService: AppformService ){}

  ngOnInit(): void{
     
    this.http.get<any>(`assets/${this.jsonFile}.json`).subscribe((response)=>{
      // console.log("JSON RESPONSE:", response);
      // alert('jsons Loaded'); 
      this.config =response;
      this.form = this.appformService.buildForm(this.config);

      //to date
       this.form.get('toDate')?.valueChanges.subscribe(() => {
          this.checkDates();
        });
      
        this.form.get('fromDate')?.valueChanges.subscribe(() => {
          this.checkDates();
        });  
    });

     


  }

  submit(){
    if(this.form.valid){
      alert('Data Save Successfully');
    }
    else{
      alert('Please fill all requried box');
      this.form.markAllAsTouched();
    }
  }

  allowIndianNum(event: Event, fieldName: string): void{
  const input = event.target as HTMLInputElement;

  input.value = input.value.replace(/[^0-9]/g, '');

  this.form.get(fieldName)?.setValue(input.value);
  }

  checkDates(): void{
    const fromDate = this.form.get('fromDate')?.value;
    const toDate = this.form.get('toDate')?.value;

    if (fromDate && toDate && toDate < fromDate) {
    this.form.get('toDate')?.setErrors({
      dateAfter: true
     });
    }
  }


}
