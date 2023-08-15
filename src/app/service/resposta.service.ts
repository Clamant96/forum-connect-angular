import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  header(metodo: string) {

    var reqHeader = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': metodo,
      'Access-Control-Allow-Origin': '*',
      'Authorization': environment.token
    });

    return { headers: reqHeader };
  }

  findAllRespostas(): Observable<Resposta[]> {

    return this.http.get<Resposta[]>(`${this.serverPort}/resposta`, this.header("GET"));
  }

  findByIdResposta(id: number): Observable<Resposta> {

    return this.http.get<Resposta>(`${this.serverPort}/resposta/${id}`, this.header("GET"));
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/resposta/gostei/${id}/${status}`, this.header("GET"));
  }

  postResposta(resposta: Resposta): Observable<Resposta> {

    return this.http.post<Resposta>(`${this.serverPort}/resposta`, resposta, this.header("POST"));
  }

  putResposta(resposta: Resposta): Observable<Resposta> {

    return this.http.put<Resposta>(`${this.serverPort}/resposta`, resposta, this.header("PUT"));
  }

  putConteudoResposta(resposta: Resposta): Observable<boolean> {

    return this.http.put<boolean>(`${this.serverPort}/resposta/atualiza/conteudo`, resposta, this.header("PUT"));
  }

  deleteResposta(id: number){

    return this.http.delete(`${this.serverPort}/resposta/${id}`, this.header("DELETE"));
  }

}
