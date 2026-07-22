import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { WishlistResponse, GetWishlistResponse } from '../models/wishlist.model';
@Injectable({
    providedIn: 'root'
})

export class WishlistService {
    private wishlist : Product[] = [];
    wishlistItems = new BehaviorSubject<Product[]>([]);

    private baseurl = "http://192.168.10.35:8000/api/v1"; 

    constructor(private http: HttpClient){}

    getWishlist(){
        return this.http.get<GetWishlistResponse>(`${this.baseurl}/wishlist`);
    }

    addToWishlist(productId : number) {
       return this.http.post<WishlistResponse>(`${this.baseurl}/wishlist/add`,{product_id: productId});
    }

    removeFromWishlist(wishlistId: number){
        return this.http.delete<WishlistResponse>(`${this.baseurl}/wishlist/${wishlistId}`);
    }





}
