import { CategoriaService } from './../service/categoria.service';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public postagem: Postagem = new Postagem();
  public usuario: Usuario = new Usuario();
  public categoria: Categoria = new Categoria();

  public listaPostagens: Postagem[] = [];
  public listaCategoria: Categoria[] = [];

  public idPostagemSelecionada: number = 0;

  public isAdicionarPostagem: boolean = false;

  public memoriaConteudo: string;
  public memoriaTitulo: string;

  public idUsuario: number = environment.id;

  public selecaoCategoria: string = "";

  public habilitaMenuCategoria: boolean = false;

  constructor(
    private postagemService: PostagemService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.getAllPostagens();
    this.getAllCategorias();
    this.renderizaBotaoMenu();

  }

  getAllPostagens() {
    this.postagemService.findAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;

      this.listaPostagens.map((postagem) => {
        // CARREGA A QTD DE POSTAGENS DO USUARIO
        this.usuarioService.findByIdUsuario(postagem.usuario.id).subscribe((respUser: Usuario) => {
          postagem.usuario = respUser;

        });

      });

    });

  }

  getAllCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;

    });

  }

  changeCategoria(event: any) {
    this.categoria.id = event.target.value;

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

    if(window.document.URL.includes("home") && this.idPostagemSelecionada == 0 && !this.habilitaMenuCategoria) {
      window.document.querySelector('section .bloco .bloco-menu #home')?.setAttribute('style', 'background-color: var(--background-color-button-hover); color: var(--text-color-black-menu-hover); font-weight: bold; border-right: 3px solid var(--button-border-right-hover-color); margin-left: 0%; width: 90%;');
      window.document.querySelector('section .bloco .bloco-menu #pergunta')?.setAttribute('style', '');
      window.document.querySelector('section .bloco .bloco-menu #categoria')?.setAttribute('style', '');

    }else if(this.idPostagemSelecionada > 0) {
      window.document.querySelector('section .bloco .bloco-menu #pergunta')?.setAttribute('style', 'background-color: var(--background-color-button-hover); color: var(--text-color-black-menu-hover); font-weight: bold; border-right: 3px solid var(--button-border-right-hover-color); margin-left: 0%; width: 90%;');
      window.document.querySelector('section .bloco .bloco-menu #home')?.setAttribute('style', ''); // REMOVE A CONFIGURACAO DE HOME
      window.document.querySelector('section .bloco .bloco-menu #categoria')?.setAttribute('style', '');

    }else if(this.habilitaMenuCategoria) {
      window.document.querySelector('section .bloco .bloco-menu #categoria')?.setAttribute('style', 'background-color: var(--background-color-button-hover); color: var(--text-color-black-menu-hover); font-weight: bold; border-right: 3px solid var(--button-border-right-hover-color); margin-left: 0%; width: 90%;');
      window.document.querySelector('section .bloco .bloco-menu #pergunta')?.setAttribute('style', '');
      window.document.querySelector('section .bloco .bloco-menu #home')?.setAttribute('style', '');

    }

  }

  renderizaAnotacoes(){
    const anotacoes = [
      {
        descricao: "Criação de listagens de postagens"
      },
      {
        descricao: "Criação de menus"
      },
      {
        descricao: "renderizacao de comentarios"
      },
      {
        descricao: "renderizacao de respostas"
      },
      {
        descricao: "renderizacao de comentarios em respostas"
      },
      {
        descricao: "like em postagens, comentarios e respostas"
      }
    ];

    return anotacoes;
  }

  capturaIdDePostagemSelecionado(id: number) {
    this.idPostagemSelecionada = id;

    this.renderizaBotaoMenu(); // ATUALIZA MENU

  }

  removeSelecaoDePostagem() {
    this.idPostagemSelecionada = 0;

    this.renderizaBotaoMenu(); // ATUALIZA MENU
    this.getAllPostagens(); // ATUALIZA LISTA DE POSTAGENS
    this.selecionaCategoria();

  }

  habilitaCampoAdicionarPostagem() {
    this.isAdicionarPostagem = !this.isAdicionarPostagem;

  }

  publicarPostagem() {
    this.postagem = new Postagem();
    this.usuario.id = this.idUsuario;

    this.postagem.titulo = this.memoriaTitulo;
    this.postagem.conteudo = this.memoriaConteudo;
    this.postagem.usuario = this.usuario;
    this.postagem.categoria = this.categoria;

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.isAdicionarPostagem = false; //FECHA A ABA DE POSTAGEM
      this.memoriaConteudo = "";
      this.memoriaTitulo = "";

      this.getAllPostagens(); // ATUALIZA A LISTA DE POSTAGEM

    }, err => {
      console.log("Ocorreu um erro ao tentar postar a postagem.");

      this.isAdicionarPostagem = false; //FECHA A ABA DE POSTAGEM
      this.memoriaConteudo = "";
      this.memoriaTitulo = "";

    });

  }

  selecionaCategoria() {
    this.idPostagemSelecionada = 0; // ZERA SELECAO DE POSTAGEM CASO TENHA SIDO CLICADA

    this.habilitaMenuCategoria = !this.habilitaMenuCategoria;

    this.renderizaBotaoMenu();

  }

}
