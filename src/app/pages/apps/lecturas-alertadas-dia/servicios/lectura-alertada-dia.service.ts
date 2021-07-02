import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { customerLecturaAlertada } from '../interfaces/customer-lecturasAlertadas.module';
import { ParametersDtoAlertaI } from '../models/ParametersDtoAlertas.interface';

@Injectable({
  providedIn: 'root'
})
export class LecturaAlertadaDiaService {
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

  BuscarTagAlertados(form:ParametersDtoAlertaI):Observable<customerLecturaAlertada[]>{
    return this.http.post<customerLecturaAlertada[]>(this.url + 'api/Reportes/LecturasAlertadasPorDia' ,form, this.headers);
    }
}
