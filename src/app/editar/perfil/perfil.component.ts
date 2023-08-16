import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public id: number = 0;

  public usuario: Usuario = new Usuario();

  public confirmarSenha: string = "";

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    window.scroll(0,0);

    if(environment.token == '') {
      this.router.navigate(['/login']);
    }

    this.id = this.route.snapshot.params['id'];
    this.findByIdUsuario(this.id);

  }

  findByIdUsuario(id: number) {
    this.usuarioService.findByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp;

      this.usuario.comentarios = [];
      this.usuario.comentariosRespostas = [];
      this.usuario.postagens = [];
      this.usuario.respostas = [];

    });
  }

  confirmeSenha(event: any) {
    this.confirmarSenha = event.target.value;

  }

  atualizar() {

    if(this.confirmarSenha.includes(this.usuario.senha)) {

      console.log(this.usuario);

      this.usuarioService.putUsuario(this.usuario).subscribe((resp: Usuario) => {

        alert("Usuario atualizado com sucesso!");

        environment.token = "";
        localStorage.removeItem('token');
        this.router.navigate(['/login']);

      }, err => {

        alert("Ocorreu um erro ao tentar atualizar o usuario na base.");

      });

    }else {

      alert("As senha devem ser iguais.");

    }

  }

}
