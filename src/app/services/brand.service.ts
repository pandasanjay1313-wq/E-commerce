import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BrandResponse } from "../models/brand.model";

@Injectable({
    providedIn: 'root'
})

export class BrandService {
    private apiurl ='http://127.0.0.1:8000/api/v1/brands';

constructor(private http: HttpClient){}

getBrands():Observable<BrandResponse>{
    return this.http.get<BrandResponse>(this.apiurl);
}






}











