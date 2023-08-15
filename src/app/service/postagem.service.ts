import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

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

  findAllPostagens(): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.serverPort}/postagem`, this.header("GET"));
  }

  findByIdPostagem(id: number): Observable<Postagem> {

    return this.http.get<Postagem>(`${this.serverPort}/postagem/${id}`, this.header("GET"));
  }

  findPostagensByIdCategoria(id: number): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.serverPort}/postagem/by/categoria/${id}`, this.header("GET"));
  }

  registraVisualizacao(id: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.serverPort}/postagem/visualizacao/${id}`, this.header("GET"));
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/postagem/gostei/${id}/${status}`, this.header("GET"));
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.post<Postagem>(`${this.serverPort}/postagem`, postagem, this.header("POST"));
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.serverPort}/postagem`, postagem, this.header("PUT"));
  }

  putConteudoPostagem(postagem: Postagem): Observable<boolean> {

    return this.http.put<boolean>(`${this.serverPort}/postagem/atualiza/conteudo`, postagem, this.header("PUT"));
  }

  deletePostagem(id: number){

    return this.http.delete(`${this.serverPort}/postagem/${id}`, this.header("DELETE"));
  }

}
