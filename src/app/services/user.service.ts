import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RegisterResponse } from '../models/register.model';
import { ReplaySubject } from 'rxjs';
import { LogoutResponse } from '../models/logout.model';
@Injectable({
	providedIn: 'root'
})
export class UserService {
	private baseurl = 'http://192.168.10.35:8000/api/v1';
	//subject
	// currentUser = new Subject<string>();
	
	currentUser = new BehaviorSubject<string>("");//behavior

	//behavior Subject

	isLoggedIn = new BehaviorSubject<boolean>(false);

	//replay subject

	loginHistory$ = new ReplaySubject<string>(5);

	constructor(private http: HttpClient) { }

	login(email: string, password: string): Observable<LoginResponse>{
        return this.http.post<LoginResponse>(`${this.baseurl}/login`, { email, password });
    }

	register(name:string, email: string, password: string, password_confirmation: string):Observable<RegisterResponse>{
		return this.http.post<RegisterResponse>(
			`${this.baseurl}/register`,{name, email, password, password_confirmation});
	}
	logout(){
		return this.http.post<LogoutResponse>(`${this.baseurl}/logout`, {})
	}

}
