import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppformService } from '../../services/appform.service';

@Component({
  selector: 'app-app-form',
  standalone: false,
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.css'
})
export class AppFormComponent implements OnInit {
  form!: FormGroup;
  config: any;

  constructor(private http: HttpClient, private appformService: AppformService ){}

  ngOnInit(): void{
    this.http.get<any>('assets/form-config.json').subscribe((response)=>{
      this.config =response.regisForm;
      this.form = this.appformService.buildForm(this.config);
    })
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

}
