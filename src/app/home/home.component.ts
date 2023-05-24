import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public listaPostagens: Postagem[] = [];

  constructor(
    private postagemService: PostagemService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.getAllPostagens();
    this.renderizaBotaoMenu();

  }

  getAllPostagens() {
    this.postagemService.findAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;

    });

  }

  calculaInteracoes(postagem: Postagem) {

    try {
      let qtdComentarios: number = postagem.comentarios.length;
      let qtdRespostas: number = postagem.respostas.length;

      return qtdComentarios + qtdRespostas;
    }catch { return;}

  }

  calculaQtdPostagensUsuario(usuario: Usuario) {

    try {
      let qtdPostagens: number = usuario.postagens.length;

      return qtdPostagens;
    }catch { return;}

  }

  renderizaPlural(usuario: Usuario) {

    let qtdPostagens: number = 0;

    try {
      qtdPostagens = usuario.postagens.length;

    }catch {}

    if(qtdPostagens > 1) {

      return "posts";
    }else {

      return "post";
    }

  }

  calculaTempoPostagem(data: Date) {

    let date_1: Date = new Date(data);
    let date_2: Date = new Date();

    if(date_1.getDay() == date_2.getDay()) {

      return this.diffTime(`${date_1.getHours()}:${date_1.getMinutes()}`, `${date_2.getHours()}:${date_2.getMinutes()}`);
    }else {

      if((Math.abs(date_1.getDay() - date_2.getDay())) == 1) {

        return Math.abs(date_1.getDay() - date_2.getDay()) +" dia";
      }

      return Math.abs(date_1.getDay() - date_2.getDay()) +" dias";
    }

  }

  pad(num: number) {
    return ("0"+num).slice(-2);
  }

  diffTime(start: string ,end: string) {
    var s: any;
    var e: any;
    var sMin: number = 0;
    var eMin: number = 0;
    var diff: number = 0;

    s = start.split(":");
    sMin = +s[1] + s[0]*60;
    e =   end.split(":");
    eMin = +e[1] + e[0]*60;
    diff = eMin-sMin;
    if (diff<0) { sMin-=12*60;  diff = eMin-sMin }
    var h = Math.floor(diff / 60),
        m = diff % 60;

    if(this.pad(h) == "00") {

      return "" + this.pad(m) +"min";
    }else {

      return "" + this.pad(h) + "h" + this.pad(m) +"min";
    }

  }

  renderizaBotaoMenu() {

    if(window.document.URL.includes("home")) {
      window.document.querySelector('section .bloco .bloco-menu #home')?.setAttribute('style', 'background-color: var(--background-color-button-hover); color: var(--text-color-black-menu-hover); font-weight: bold; border-right: 3px solid var(--button-border-right-hover-color); margin-left: 0%; width: 90%;');

    }

  }

  renderizaAnotacoes(){
    const anotacoes = [
      {
        descricao: "Criação de listagens de postagens"
      },
      {
        descricao: "Criação de menus"
      }
    ];

    return anotacoes;
  }

}
