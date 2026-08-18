
import { ChangeDetectionStrategy, Component, NgZone } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { interval } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'ProductApp';
  message = 'Loading...';
  count = 0;
  addCount = 0;
  cout$ = interval(1000);
  constructor(public router: Router, private ngzone : NgZone){}

    get isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register'|| 
    this.router.url === '/regi' || this.router.url === '/form' ||
    this.router.url === '/appform' || this.router.url === "/loghis" || this.router.url === "/provid"||
    this.router.url === '/commonlist';
  }
  //////////////////////////////
//////////without Async ////////////
cout = 0;
ngOnInit(){
  interval(1000).subscribe(value=>{ 
    this.cout = value;
  });
}
  ///////////// ng Zone //////////////////
//////////////// run() //////////////
  loadData(){
    setTimeout(()=>{
      this.ngzone.run(()=>{
        this.message = 'Data Loaded';
        console.log(this.message);
      });
    },3000);
  }
/////////////// runOutsideAngular() /////////
startTimer(){
  this.ngzone.runOutsideAngular(()=>{
    setInterval(()=>{
      this.count++;
      console.log(this.count);
    },1000);
  });
}

////////////// runOutsideAngular() + run() ////////////
start(){
  this.ngzone.runOutsideAngular(()=>{
    console.log('Outside angular');

    let result = 10+20;

    this.ngzone.run(()=>{
      this.addCount = result;

    });
  });
}
//////////////////////////////
isLoggedIn = true;
isAdmin = false;
role = 'admin';
orderStatus = 'shipped';
isActive = true;
mark = 80;

textColor = 'red';
fontSize = 50;






products = ['Mobile','Laptop','Tablet'];

students = [  { id: 1, name: 'Arun' },
  { id: 2, name: 'Bala' },
  { id: 3, name: 'Kumar' }
];


//////////////////// change detection /////////


// count = 0;

//   increase() {
//     this.count++;
//   }

//   decrease(){
//     this.count--;
//   }

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
