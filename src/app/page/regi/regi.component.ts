import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegiService } from '../../services/regi.service';
@Component({
  selector: 'app-regi',
  standalone: false,
  templateUrl: './regi.component.html',
  styleUrls: ['./regi.component.css'
  ]
})
export class RegiComponent {
  regiForm: FormGroup;

  constructor(private fb: FormBuilder, private regiService: RegiService){
     this.regiForm = this.fb.group({
    name :['',Validators.required ],
    email :['',[Validators.required,Validators.email]],
    mobile: ['',Validators.required],
    state: [''],
    city: [''],
    pincode: [''],
    password: ['',Validators.required]
  });
}

regis(){
   this.regiService.getRegi().subscribe((users: any[]) => {

      const formData = this.regiForm.value;

      const user = users.find(u =>

        u.name === formData.name &&
        u.email === formData.email &&
        u.mobile === formData.mobile &&
        u.password === formData.password &&
        u.address.state === formData.state &&
        u.address.city === formData.city &&
        u.address.pincode === formData.pincode

      );

      if (user) {

        alert('Register Successful');

      } else {

        alert('Invalid Details');

      }

    });

  }

  // console.log(this.regiForm.value);
}

 


