import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule ,CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){
 if (this.loginForm.invalid) {
    return;
  }

  const email = this.loginForm.value.email;
  const password = this.loginForm.value.password;

  // console.log(email);
  // console.log(password);

  this.userService.login(email, password).subscribe({
    next: (res) => {
      console.log(res);

      this.userService.currentUser.next(res.user.name);
      // this.userService.currentUser.next(res.user.name);

      this.userService.isLoggedIn.next(true);

      this.userService.loginHistory$.next(`${email}-login Success`);

      this.router.navigate(['/products']);

      
    },
    error: (err) => {
      console.log(err);
       this.userService.loginHistory$.next(
    `${email} - Login Failed`);
    }
  });
    
  }

  

}
