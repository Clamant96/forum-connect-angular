import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  public id: number = 0;

  public postagem: Postagem = new Postagem();

  constructor(
    private route: ActivatedRoute,
    private postagemService: PostagemService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    /* RECEBE O NOVO ID DE ACORDO COM A OPCAO ESCOLHIDA PELO USUARIO AO ATUALIZAR O DADO DE TEMA */
    this.id = this.route.snapshot.params['id'];

    this.getByIdPostagem(this.id);
    // this.registraVisualizacaoPostagem(this.id);

  }

  getByIdPostagem(id: number) {
    this.postagemService.findByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

    });

  }

  registraVisualizacaoPostagem(id: number) {
    this.postagemService.registraVisualizacao(id).subscribe((resp: boolean) => {
      console.log("Visualizacao salva!");

    }, err => {
      console.log("Ocorreu um erro ao salar a visualizacao.");

    });

  }

  calculaQtdPostagensUsuario(usuario: Usuario) {

    try {
      let qtdPostagens: number = usuario.postagens.length;

      return qtdPostagens;
    }catch { return;}

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

  renderizaCategoria(categoria: Categoria) {
    try {
      return categoria.nome;
    }catch{return;}
  }

  renderizaUsuarioImg(usuario: Usuario) {
    try {
      return usuario.img;
    }catch{return;}
  }

  renderizaUsuarioNome(usuario: Usuario) {
    try {
      return usuario.nome;
    }catch{return;}
  }

  //// TESTE



  //////////
}
