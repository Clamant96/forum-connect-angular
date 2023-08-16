import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public serverPort: string = `${environment.server}${environment.port}`;

  /* CRIA UM TOKEN, PARA REALIZAR A AUTENTICACAO DO ENDPOINT, POR MEIO DO METODO Authorization, PASSANDO COMO PAREMTRO O TOKEN DO USUARIO LOGADO */
  autorizacao = {
    headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || '')
    //headers: new HttpHeaders().set('Authorization', environment.token)

  }

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

  findAllUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(`${this.serverPort}/usuario`, this.header("GET"));
  }

  findByIdUsuario(id: number): Observable<Usuario> {

    return this.http.get<Usuario>(`${this.serverPort}/usuario/${id}`, this.header("GET"));
  }

  findByQtdPostagensIdUsuario(id: number): Observable<number> {

    return this.http.get<number>(`${this.serverPort}/usuario/qtd-postagens/${id}`, this.header("GET"));
  }

  postUsuario(usuario: Usuario): Observable<Usuario> {

    usuario.img = environment.nomeUplaodImagem;

    return this.http.post<Usuario>(`${this.serverPort}/usuario`, usuario, this.header("POST"));
  }

  putUsuario(usuario: Usuario): Observable<Usuario> {

    usuario.img = environment.nomeUplaodImagem;

    return this.http.put<Usuario>(`${this.serverPort}/usuario/atualizar`, usuario, this.header("PUT"));
  }

  deleteUsuario(id: number){

    return this.http.delete(`${this.serverPort}/usuario/${id}`, this.header("DELETE"));
  }

  isLogado() {

    let ok: boolean = false;

    if(environment.token == "") {
      ok = false;

    }else {
      ok = true;
    }

    return ok;
  }

  entrar(login: UsuarioLogin): Observable<UsuarioLogin> {

    var reqHeader = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post<UsuarioLogin>(`${this.serverPort}/usuario/login`, login, { headers: reqHeader });
  }

  cadastrar(cadastro: Usuario): Observable<Usuario> {

    var reqHeader = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Origin': '*'
    });

    return this.http.post<Usuario>(`${this.serverPort}/usuario/cadastrar`, cadastro, { headers: reqHeader });
  }

}
