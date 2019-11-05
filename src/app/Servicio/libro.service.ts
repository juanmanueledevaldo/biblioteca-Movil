import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILibro } from '../Interface/libro';
import {  Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
const httpOptions = {
  headers :  new HttpHeaders({'content-type':'aplication/json'})
};
const apiUrl = "http//localhost:59417/api/libro";
@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  constructor(private http:HttpClient) { }
  private handleError<T>(operation = 'operation', result?:T){
    return (error : any) : Observable<T> =>{
      return of(result as T)
    }
  }
  get():Observable<ILibro[]>{
    let linkRequest = `${apiUrl}`;
    return this.http.get<ILibro[]>(linkRequest).pipe(retry(1));
  }
  getLibro(codigo:string){
    let linkRequest =`${apiUrl}/${codigo}`;
    return this.http.get<ILibro>(linkRequest).pipe(retry(1));
  }
  post(libro:ILibro){
    let linkRequest = `${apiUrl}`;
    return this.http.post(linkRequest,libro).pipe(catchError(this.handleError))
  }
  put(libro:ILibro){
    let linkRequest = `${apiUrl}/${libro.Codigo}`;
    return this.http.put(apiUrl, libro).pipe(catchError(this.handleError))
  }
}
