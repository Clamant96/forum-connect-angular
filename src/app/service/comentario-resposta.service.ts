import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  findAllComentarioRespostas(): Observable<ComentarioResposta[]> {

    return this.http.get<ComentarioResposta[]>(`${this.serverPort}/comentario-resposta`);
  }

  findByIdComentarioResposta(id: number): Observable<ComentarioResposta> {

    return this.http.get<ComentarioResposta>(`${this.serverPort}/comentario-resposta/${id}`);
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/comentario-resposta/gostei/${id}/${status}`);
  }

  postComentarioResposta(comentario: ComentarioResposta): Observable<ComentarioResposta> {

    return this.http.post<ComentarioResposta>(`${this.serverPort}/comentario-resposta`, comentario);
  }

  putComentarioResposta(comentario: ComentarioResposta): Observable<ComentarioResposta> {

    return this.http.put<ComentarioResposta>(`${this.serverPort}/comentario-resposta`, comentario);
  }

  deleteComentarioResposta(id: number){

    return this.http.delete(`${this.serverPort}/comentario-resposta/${id}`);
  }

}
