import { Injectable } from '@angular/core';
import { LoginI } from '../modelos/login.interface';
import { ResponseI } from '../modelos/response.interface';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = "https://localhost:44344/";

  constructor(private http:HttpClient) { }

  loginbyEmail(form:LoginI):Observable<ResponseI>{
    let direccion = this.url + "/api/Usuario/login";
    return this.http.post<ResponseI>(direccion, form);
  }

  login(model:any):Observable<ResponseI>{
    let direccion = this.url + "api/Usuario/login";
    return this.http.post<ResponseI>(direccion, form);

  }

}
