import { Component,OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-login-history',
  standalone: false,
  templateUrl: './login-history.component.html',
  styleUrl: './login-history.component.css'
})
export class LoginHistoryComponent implements OnInit {
  history: string[] = [];

  constructor(private userService: UserService) { }

ngOnInit() {

  this.userService.loginHistory$.subscribe(data => {
      console.log("replay data:", data);
    this.history.push(data);

  });

}
}
