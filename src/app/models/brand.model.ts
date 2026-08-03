export interface Brand {
    id: number;
    logo: string;
    name: string;
    slug: string;
    is_featured: number;
    status: number;
    created_at: string;
    updated_at: string;
}


export interface BrandResponse {
    status: string;
    brands: Brand[];
}