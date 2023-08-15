import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  header(metodo: string) {

    var reqHeader = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': metodo,
      'Access-Control-Allow-Origin': '*',
      'Authorization': environment.token
    });

    return { headers: reqHeader };
  }

  findAllComentarios(): Observable<Comentario[]> {

    return this.http.get<Comentario[]>(`${this.serverPort}/comentario`, this.header("GET"));
  }

  findByIdComentario(id: number): Observable<Comentario> {

    return this.http.get<Comentario>(`${this.serverPort}/comentario/${id}`, this.header("GET"));
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/comentario/gostei/${id}/${status}`, this.header("GET"));
  }

  postComentario(comentario: Comentario): Observable<Comentario> {

    return this.http.post<Comentario>(`${this.serverPort}/comentario`, comentario, this.header("POST"));
  }

  putComentario(comentario: Comentario): Observable<Comentario> {

    return this.http.put<Comentario>(`${this.serverPort}/comentario`, comentario, this.header("PUT"));
  }

  deleteComentario(id: number) {

    return this.http.delete(`${this.serverPort}/comentario/${id}`, this.header("DELETE"));
  }

}
