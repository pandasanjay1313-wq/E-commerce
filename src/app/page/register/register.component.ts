import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
registerForm: FormGroup;

constructor(private fb: FormBuilder, private userService: UserService, private router: Router){

  this.registerForm = this.fb.group({
    name: ['',Validators.required],
    email: ['',[Validators.required, Validators.email]],
    password: ['',Validators.required],
    password_confirmation: ['',Validators.required]
  });
}

register(){
  if(this.registerForm.invalid){
    return;
  }

  const name = this.registerForm.value.name;
  const email = this.registerForm.value.email;
  const password = this.registerForm.value.password;
  const password_confirmation = this.registerForm.value.password_confirmation;
  
this.userService.register(name, email, password, password_confirmation)
  .subscribe({
    next: (res)=> {
      console.log(res);
      alert(res.message);
      this.router.navigate(['/login']);
    },
    error: (err)=> {
      console.log(err);
      alert(err.error.message);
    }
  });

}



}
