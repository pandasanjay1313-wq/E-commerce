    
export interface LoginResponse{
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
}