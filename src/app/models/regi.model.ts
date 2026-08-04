export interface Regi {
    id: number;
    name: string;
    email: string;
    mobile: string;
    address:{
        state: string;
        city: string;
        pincode: string;
    };
     password: string
}