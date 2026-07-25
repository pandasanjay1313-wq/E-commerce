import { Component,OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
   imports: [CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:any[]=[];

  constructor(private wishlistService: WishlistService){}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(){
    this.wishlistService.getWishlist().subscribe({
      next:(res)=>{
        console.log("Wishlist Response:", res);
        this.wishlist = res.wishlist;
      },
      error:(err)=>{
        console.log("Wishlist Error:", err);
      }
    });
  }

  remove(id: number){
    this.wishlistService.removeFromWishlist(id)
    .subscribe({
      next:(res)=>{
        alert(res.message);
        this.loadWishlist();
      }
    });
  }

   getwishUrl(path:string): string {
  
      return `http://127.0.0.1:8000/${path}`;
    }
  






}
