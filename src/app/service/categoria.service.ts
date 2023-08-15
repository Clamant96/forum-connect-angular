import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  public serverPort: string = `${environment.server}${environment.port}`

  constructor(
    private http: HttpClient

  ) { }

  header(metodo: string) {

    var reqHeader = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': metodo,
      'Access-Control-Allow-Origin': '*',
      'Authorization': environment.token
    });

    return { headers: reqHeader };
  }

  findAllCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.serverPort}/categoria`, this.header("GET"));
  }

  findByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.serverPort}/categoria/${id}`, this.header("GET"));
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.serverPort}/categoria`, categoria, this.header("POST"));
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.serverPort}/categoria`, categoria, this.header("PUT"));
  }

  deleteCategoria(id: number) {

    return this.http.delete(`${this.serverPort}/categoria/${id}`, this.header("DELETE"));
  }

}
