import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  public serverPort: string = `${environment.server}${environment.port}`

  constructor(
    private http: HttpClient

  ) { }

  findAllComentarios(): Observable<Comentario[]> {

    return this.http.get<Comentario[]>(`${this.serverPort}/comentario`);
  }

  findByIdComentario(id: number): Observable<Comentario> {

    return this.http.get<Comentario>(`${this.serverPort}/comentario/${id}`);
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/comentario/gostei/${id}/${status}`);
  }

  postComentario(comentario: Comentario): Observable<Comentario> {

    return this.http.post<Comentario>(`${this.serverPort}/comentario`, comentario);
  }

  putComentario(comentario: Comentario): Observable<Comentario> {

    return this.http.put<Comentario>(`${this.serverPort}/comentario`, comentario);
  }

  deleteComentario(id: number) {

    return this.http.delete(`${this.serverPort}/comentario/${id}`);
  }

}
