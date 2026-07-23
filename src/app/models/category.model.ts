export interface category{
    id: number;
    name: string;
    slug: string;
    icon: string;
    status: number;
}

export interface categoryResponse{
    status: string;
    categories: category[];
}
