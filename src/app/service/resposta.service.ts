import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Resposta } from '../model/Resposta';

@Injectable({
  providedIn: 'root'
})
export class RespostaService {

  public serverPort: string = `${environment.server}${environment.port}`

  constructor(
    private http: HttpClient

  ) { }

  findAllRespostas(): Observable<Resposta[]> {

    return this.http.get<Resposta[]>(`${this.serverPort}/resposta`);
  }

  findByIdResposta(id: number): Observable<Resposta> {

    return this.http.get<Resposta>(`${this.serverPort}/resposta/${id}`);
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/resposta/gostei/${id}/${status}`);
  }

  postResposta(resposta: Resposta): Observable<Resposta> {

    return this.http.post<Resposta>(`${this.serverPort}/resposta`, resposta);
  }

  putResposta(resposta: Resposta): Observable<Resposta> {

    return this.http.put<Resposta>(`${this.serverPort}/resposta`, resposta);
  }

  putConteudoResposta(resposta: Resposta): Observable<boolean> {

    return this.http.put<boolean>(`${this.serverPort}/resposta/atualiza/conteudo`, resposta);
  }

  deleteResposta(id: number){

    return this.http.delete(`${this.serverPort}/resposta/${id}`);
  }

}
