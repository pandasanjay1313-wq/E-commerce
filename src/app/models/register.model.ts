
export interface RegisterResponse{
    status: string;
    message: string;
    user: User;
    token: string;
}

export interface User{
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
    updated_at: string;
}