
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




// const students = [
//  {name:"John", age:20},
//  {name:"Sam", age:16},
//  {name:"Raj", age:22}
// ];

// const result = students
//   .filter(student => student.age > 18)
//   .map(student => student.name);

// console.log(result);


//   student=[{name:'john',
//   mark:50},
//   {name:'ravi',
//   mark:75},
// {name:'kumar',
//   mark:75}]

// const result=student.filter(std =>(std.mark===75));
// console.log(result);
}
