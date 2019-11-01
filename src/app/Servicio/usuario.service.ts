import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Usuario } from '../Model/usuario';
import { catchError, tap, map, retry } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://localhost:59417/api/usuario";
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
  get():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(apiUrl).pipe(retry(1));
  }
  getId(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(`${apiUrl}/${id}`).pipe(retry(1));

  }
  post(usuario:Usuario){
    return this.http.put(apiUrl, usuario).pipe(catchError(this.handleError));
  }
  update(usuario:Usuario){
    return this.http.put(`${apiUrl}/${usuario.Id}`, usuario).pipe(catchError(this.handleError));
  }





















  // getUsuario(id):Observable<Usuario>{
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get<Usuario>(url).pipe(
  //     tap(_ => 
  //       console.log(`ytls el id es: ${_}`)
  //       ),
  //     catchError(this.handleError<Usuario>(`getUsuario id= ${id}`))
  //   );
  // }
  // updateUsuario(id,usuario):Observable<any>{
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.put(url, usuario,httpOptions).pipe(
  //     tap(_=> console.log(_)
  //     ), catchError(this.handleError<any>('updateUsuario'))
  //   );
  // }

}
