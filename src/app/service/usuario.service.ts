import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public serverPort: string = `${environment.server}${environment.port}`

  constructor(
    private http: HttpClient

  ) { }

  findAllUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.serverPort}/usuario`);
  }

  findByIdUsuario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.serverPort}/usuario/${id}`);
  }

  findByQtdPostagensIdUsuario(id: number): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/usuario/qtd-postagens/${id}`);
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>(`${this.serverPort}/usuario`, usuario);
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.put<Usuario>(`${this.serverPort}/usuario`, usuario);
  }

  deleteUsuario(id: number){

    return this.http.delete(`${this.serverPort}/usuario/${id}`);
  }

}
