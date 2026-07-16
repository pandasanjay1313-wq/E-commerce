
import { Product } from './product.model';

export interface CartItem {
  id: number;
  product_id: number;
  price: string;
  product: Product;
  qty: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}
