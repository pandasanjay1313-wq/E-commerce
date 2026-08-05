import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class StuformService {
    constructor(private http: HttpClient){}

    getForm():Observable<any>{
        return this.http.get('assets/student-form.json');
    }













}



