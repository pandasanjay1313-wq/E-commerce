
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string; // DummyJSON uses 'thumbnail' instead of 'image'
  images: string[];   // DummyJSON also provides an array of images
  rating: number;     // DummyJSON uses a simple number, not an object
  stock: number;      // DummyJSON always has stock
  brand?: string;     // Additional fields from DummyJSON
  discountPercentage?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
