import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ParametrosDtoI } from '../modelos/ParametrosDto.interface';
import { Customer } from '../interfaces/customer.model';

@Injectable({
  providedIn: 'root'
})
export class LecturasDelDiaService {

  url:string = "https://localhost:44344";

  constructor(private http:HttpClient) { }

  loginbyEmail(form:ParametrosDtoI):Observable<Customer>{

    let direccion = this.url + "/api/Reportes/LecturasDelDia";

    return this.http.post<Customer>(direccion, form);

  }
  
}
