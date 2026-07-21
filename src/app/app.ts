
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'ProductApp';
  constructor(public router: Router){}

    get isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
