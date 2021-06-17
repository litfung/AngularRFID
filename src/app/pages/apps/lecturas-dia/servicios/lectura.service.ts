import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParametersDtoI } from '../models/ParametersDto.interface';
import { customerLectura } from '../interfaces/customer-lectura.module';
import { ParametrosDtoI } from '../../aio-table/modelos/ParametrosDto.interface';

@Injectable({
  providedIn: 'root'
})
export class LecturaService {
  url:string = "https://localhost:44344";
  
  constructor(private http: HttpClient) {
  }

  get token():string {
    return localStorage.getItem('token' );
  }


  get headers(){
    return {
      headers:{
        'Authorization': 'Bearer ' + this.token
      }
    }
  }

  // loginbyEmail(form:ParametersDtoI):Observable<customerLectura>{

  //   let direccion = this.url + "/api/Reportes/LecturasDelDia";

  //   return this.http.post<customerLectura>(direccion, form);

  //}

  BuscarTag(form:ParametersDtoI):Observable<customerLectura[]>{
  return this.http.post<customerLectura[]>(this.url + '/api/Reportes/LecturasDelDia' ,form, this.headers);
  }
 
}
