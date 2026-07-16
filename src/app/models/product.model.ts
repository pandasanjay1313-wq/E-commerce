export interface Product {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  long_description: string;
  price: number;
  offer_price: number;
  discount_percent: number;
  qty: number;
   category: {
    id: number;
    name: string;
  };
  thumb_image: string;
  product_image_galleries: {
    id: number;
    image: string;
  }[];
  brand_id: number;
}

export interface CartItem {
  product: Product;
  qty: number;
}
