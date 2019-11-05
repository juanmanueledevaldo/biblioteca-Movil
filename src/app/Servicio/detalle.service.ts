import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Prestamo } from '../Model/prestamo';
import { Detalle } from '../Model/detalle';
import { retry, catchError } from 'rxjs/operators';
import { ILibro } from '../Interface/libro';
const httpOption = {
headers : new HttpHeaders({'content-type':'aplication/json'})
};
const apiUrl = "http//localhost:59417/api/detalle";
@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  private handleError <T>(operation='operation' , result?:T){
    return (error:any) :Observable<T> =>{
      return of(result as T);
    }
  }
  constructor(private http:HttpClient) { }
  get(momento:string):Observable<Detalle[]>{
    let linkRequest = `${apiUrl}/${momento}`;
    return this.http.get<Detalle[]>(linkRequest).pipe(retry(1))
  }
  // getMoment():Observable<Detalle>{
  //   let linkRequest = `${apiUril}/`;
  //   return this.http.get<Detalle>(linkRequest).pipe(catchError(this.handleError));
  // }
  
  post(detalle:Detalle){
    let linkRequest = `${apiUrl}`;
    return this.http.post(apiUrl,detalle).pipe(catchError(this.handleError));
  }
  put(detalle:Detalle){
    let linkRequest = `${apiUrl}/${detalle.Momento}`;
    return this.http.put(linkRequest,detalle)
  }
  delete(codigo:string){
    let linkRequest = `${apiUrl}/${codigo}`;
    return this.http.delete(linkRequest).pipe(catchError(this.handleError));
  }
}
