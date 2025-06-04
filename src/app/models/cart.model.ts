
import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}
