import { Injectable } from '@angular/core';
import { HttpHandler, HttpHeaders, HttpClient } from '@angular/common/http';
import { observable, Observable, of } from 'rxjs';
import { on } from 'cluster';
import { Prestamo } from '../Model/prestamo';
import { retry, catchError } from 'rxjs/operators';
import { link } from 'fs';
const httpOptions = {
  headers: new HttpHeaders({ 'content-type': 'aplication/json' })
};
const apiUrl = "http//localhost:59417/api/prestamo";
@Injectable({
  providedIn: 'root'
})
export class PrestamoService {


  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }

  }
  get(): Observable<Prestamo[]> {
    let linkRequest = `${apiUrl}`;
    return this.http.get<Prestamo[]>(linkRequest).pipe(retry(1));
  }
  getCode(codigo: string): Observable<Prestamo> {
    let linkRequest = `${apiUrl}/${codigo}`;
    return this.http.get<Prestamo>(linkRequest).pipe(retry(1));
  }
  post(prestamo:Prestamo) {
    let linkRequest =`${apiUrl}`;
    console.log(prestamo.Codigo);
    this.http.post(linkRequest, prestamo).pipe(catchError(this.handleError));
   }
   put(prestamo:Prestamo){
     let linkRequest =`${apiUrl}/${prestamo.Codigo}`;
     return this.http.put(linkRequest, prestamo).pipe(catchError(this.handleError));
   }

}