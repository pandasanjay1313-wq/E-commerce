import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../models/product.model';

export interface ProductFilterCriteria {
  category?: string;
  title?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Pipe({
  name: 'productFilter',
  standalone: false,
  pure: false  // Changed to false to ensure proper change detection
})
export class ProductFilterPipe implements PipeTransform {

  transform(products: Product[], filters: ProductFilterCriteria): Product[] {
    // If no products exist, return empty array
    if (!products || !products.length) {
      return [];
    }

    // If no filters are applied, return all products
    if (!filters || this.isEmpty(filters)) {
      return products;
    }

    // Filter the products based on criteria
    return products.filter(product => {
      // Filter by category
      if (filters.category && filters.category.trim() !== '') {
        if (product.category !== filters.category) {
          return false;
        }
      }

      // Filter by title (case-insensitive search)
      if (filters.title && filters.title.trim() !== '') {
        if (!product.title.toLowerCase().includes(filters.title.toLowerCase())) {
          return false;
        }
      }

      // Filter by minimum price
      if (filters.minPrice !== null && filters.minPrice !== undefined && filters.minPrice > 0) {
        if (product.price < filters.minPrice) {
          return false;
        }
      }

      // Filter by maximum price
      if (filters.maxPrice !== null && filters.maxPrice !== undefined && filters.maxPrice > 0) {
        if (product.price > filters.maxPrice) {
          return false;
        }
      }

      return true;
    });
  }

  private isEmpty(filters: ProductFilterCriteria): boolean {
    return (
      (!filters.category || filters.category.trim() === '') &&
      (!filters.title || filters.title.trim() === '') &&
      (filters.minPrice === null || filters.minPrice === undefined || filters.minPrice <= 0) &&
      (filters.maxPrice === null || filters.maxPrice === undefined || filters.maxPrice <= 0)
    );
  }
}
