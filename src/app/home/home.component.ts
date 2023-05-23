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

    console.log(data);

    let date_1: Date = new Date(data);
    let date_2: Date = new Date();

    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    if(date_1.getDay() == date_2.getDay()) {

      return this.diffTime(`${date_1.getHours()}:${date_1.getMinutes()}`, `${date_2.getHours()}:${date_2.getMinutes()}`);
    }else {

      if((date_1.getDay() - date_2.getDay()) == 1) {

        return date_1.getDay() - date_2.getDay() +" dia";
      }

      return date_1.getDay() - date_2.getDay() +" dias";
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

}
