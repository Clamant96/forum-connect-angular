import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLogin: UsuarioLogin = new UsuarioLogin();
  public usuario: Usuario = new Usuario();

  public confirmarSenha: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  entrar() {
    this.usuarioService.entrar(this.userLogin).subscribe((resp: UsuarioLogin) => {
      this.userLogin = resp;

      environment.id = this.userLogin.id;
      environment.nome = this.userLogin.nome;
      environment.img = this.userLogin.img;
      environment.token = this.userLogin.token;
      environment.email = this.userLogin.email;
      environment.senha = this.userLogin.senha;

      /* ARMAZENA O TOKEN DO USUARIO NO LOCAL STORAGE */
      localStorage.setItem('token', environment.token);

      this.router.navigate(['/home']);

    }, erro => {
      if(erro.status == 404) {
        alert('Usuario ou senha estao incorretos.');

      }else if(erro.status == 500) {
        alert('Ocorreu um erro na consulta.');

      }

    });

  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  cadastrar() {

    if(this.confirmarSenha.includes(this.usuario.senha)) {

      this.usuarioService.cadastrar(this.usuario).subscribe((resp: Usuario) => {

        this.userLogin.email = this.usuario.email;
        this.userLogin.senha = this.usuario.senha;

        alert("Usuario cadastro com sucesso!");

      }, err => {

        alert("Ocorreu um erro ao tentar cadastrar o usuario na base.");

      });

    }else {

      alert("As senha devem ser iguais.");

    }

  }

}
