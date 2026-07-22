import { Product } from "./product.model";

export interface wishlist {
    id: number;
    product_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    product: Product;
}

export interface WishlistResponse {
    status: string;
    message: string;
    count?: number;
    wishlist?: wishlist;
}

export interface GetWishlistResponse{
    status: string;
    wishlist: wishlist[];
    count: number;
}



