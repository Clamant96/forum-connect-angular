import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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

  findAllPostagens(): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.serverPort}/postagem`);
  }

  findByIdPostagem(id: number): Observable<Postagem> {

    return this.http.get<Postagem>(`${this.serverPort}/postagem/${id}`);
  }

  findPostagensByIdCategoria(id: number): Observable<Postagem[]> {

    return this.http.get<Postagem[]>(`${this.serverPort}/postagem/by/categoria/${id}`);
  }

  registraVisualizacao(id: number): Observable<boolean> {

    return this.http.get<boolean>(`${this.serverPort}/postagem/visualizacao/${id}`);
  }

  registraAvaliacao(id: number, status: string): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/postagem/gostei/${id}/${status}`);
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.post<Postagem>(`${this.serverPort}/postagem`, postagem);
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {

    return this.http.put<Postagem>(`${this.serverPort}/postagem`, postagem);
  }

  putConteudoPostagem(postagem: Postagem): Observable<boolean> {

    return this.http.put<boolean>(`${this.serverPort}/postagem/atualiza/conteudo`, postagem);
  }

  deletePostagem(id: number){

    return this.http.delete(`${this.serverPort}/postagem/${id}`);
  }

}
