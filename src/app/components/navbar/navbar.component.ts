import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent implements OnInit {
  cartCount$: Observable<number>;

  constructor(private cartService: CartService, private userService: UserService) {
    this.cartCount$ = this.cartService.cart$.pipe(
      map(items => this.cartService.getCartCount())
    );
  }
Message: string= "";
isLoggedIn = false;
  ngOnInit(): void{
    // this.userService.currentUser.subscribe(user=>{
    //   this.message = user;
    //   console.log("Current User:", user);
    // });
    this.userService.currentUser.subscribe(user=>{
      this.Message = user;
      console.log(user);
    });

    this.userService.isLoggedIn.subscribe(status=>{
      this.isLoggedIn = status
    });

  }
logout(){
  this.userService.isLoggedIn.next(false);
}

}
