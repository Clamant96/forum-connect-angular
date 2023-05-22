import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
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

  findAllCategorias(): Observable<Categoria[]> {

    return this.http.get<Categoria[]>(`${this.serverPort}/categoria`);
  }

  findByIdCategoria(id: number): Observable<Categoria> {

    return this.http.get<Categoria>(`${this.serverPort}/categoria/${id}`);
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.post<Categoria>(`${this.serverPort}/categoria`, categoria);
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {

    return this.http.put<Categoria>(`${this.serverPort}/categoria`, categoria);
  }

  deleteCategoria(id: number) {

    return this.http.delete(`${this.serverPort}/categoria/${id}`);
  }

}
