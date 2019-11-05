import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, tap, map, retry } from 'rxjs/operators';
import { IUsuario } from '../Interface/usuario';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiUrl = "http://localhost:59417/api/usuario";
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) {   }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  get(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(apiUrl).pipe(retry(1));
  }
  getId(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${apiUrl}/${id}`).pipe(retry(1));

  }
  post(usuario: IUsuario) {
    return this.http.put(apiUrl, usuario).pipe(catchError(this.handleError));
  }
  put(usuario: IUsuario) {
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
