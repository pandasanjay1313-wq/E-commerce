import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

export interface ProductFilterCriteria {
  category?: string;
  title?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Pipe({
  name: 'productFilter',
  standalone: false,
  pure: false // Make it impure to detect changes in filter criteria
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], criteria: ProductFilterCriteria): Product[] {
    if (!products || !criteria) {
      return products;
    }

    return products.filter(product => {
      // Category filter
      if (criteria.category && criteria.category.trim() !== '') {
        if (product.category.toLowerCase() !== criteria.category.toLowerCase()) {
          return false;
        }
      }

      // Title/Name filter
      if (criteria.title && criteria.title.trim() !== '') {
        const searchTerm = criteria.title.toLowerCase().trim();
        const productTitle = product.title.toLowerCase();
        if (!productTitle.includes(searchTerm)) {
          return false;
        }
      }

      // Min price filter
      if (criteria.minPrice !== null && criteria.minPrice !== undefined && criteria.minPrice > 0) {
        if (product.price < criteria.minPrice) {
          return false;
        }
      }

      // Max price filter
      if (criteria.maxPrice !== null && criteria.maxPrice !== undefined && criteria.maxPrice > 0) {
        if (product.price > criteria.maxPrice) {
          return false;
        }
      }

      return true;
    });
  }
}
