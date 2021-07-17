import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login.interface';
import { ResponseI } from '../modelos/response.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
//Changes
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = "https://localhost:44344/";
  constructor(private http:HttpClient) { }

  loginbyEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "api/Usuario/login";
    return this.http.post<ResponseI>(direccion, form);
  }

  login(form:any):Observable<ResponseI>{
    let direccion = this.url + "api/Usuario/login";
    return this.http.post<ResponseI>(direccion, form);

  }

}
