import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Comentario } from '../model/Comentario';
import { ComentarioResposta } from '../model/ComentarioResposta';

@Injectable({
  providedIn: 'root'
})
export class ComentarioRespostaService {

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

  findAllComentarioRespostas(): Observable<ComentarioResposta[]> {

    return this.http.get<ComentarioResposta[]>(`${this.serverPort}/comentario-resposta`, this.header("GET"));
  }

  findByIdComentarioResposta(id: number): Observable<ComentarioResposta> {

    return this.http.get<ComentarioResposta>(`${this.serverPort}/comentario-resposta/${id}`, this.header("GET"));
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/comentario-resposta/gostei/${id}/${status}`, this.header("GET"));
  }

  postComentarioResposta(comentario: ComentarioResposta): Observable<ComentarioResposta> {

    return this.http.post<ComentarioResposta>(`${this.serverPort}/comentario-resposta`, comentario, this.header("POST"));
  }

  putComentarioResposta(comentario: ComentarioResposta): Observable<ComentarioResposta> {

    return this.http.put<ComentarioResposta>(`${this.serverPort}/comentario-resposta`, comentario, this.header("PUT"));
  }

  deleteComentarioResposta(id: number){

    return this.http.delete(`${this.serverPort}/comentario-resposta/${id}`, this.header("DELETE"));
  }

}
