import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Regi } from "../models/regi.model";

@Injectable({
    providedIn: 'root'
})

export class RegiService {

        private url = 'assets/regi.json';

        constructor(private http : HttpClient){}

        getRegi():Observable<Regi[]>{
            return this.http.get<Regi[]>(this.url);
        }



}


