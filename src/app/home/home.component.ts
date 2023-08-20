import { CategoriaService } from './../service/categoria.service';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { UsuarioService } from '../service/usuario.service';
import { PostagemService } from './../service/postagem.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../model/Categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public postagem: Postagem = new Postagem();
  public usuario: Usuario = new Usuario();
  public categoria: Categoria = new Categoria();
  public categoriaSelecionadaOutput: Categoria = new Categoria();

  public listaPostagens: Postagem[] = [];
  public listaCategoria: Categoria[] = [];

  public idPostagemSelecionada: number = 0;
  public idCategoriaSelecionada: number = 0;

  public isAdicionarPostagem: boolean = false;

  public memoriaConteudo: string;
  public memoriaTitulo: string;

  public idUsuario: number = environment.id;

  public selecaoCategoria: string = "";

  public habilitaMenuCategoria: boolean = false;

  public url: string = `${environment.server}${environment.port}`;

  constructor(
    private postagemService: PostagemService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);
    }

    this.getAllPostagens();
    this.getAllCategorias();
    this.renderizaBotaoMenu();

  }

  capturaIdDaCategoriaSelecionada(id: any) {
    this.idCategoriaSelecionada = id;
    this.habilitaMenuCategoria = false;

    this.getAllPostagensByIdCategoria(this.idCategoriaSelecionada);
    this.renderizaBotaoMenu();
    this.getByIdCategoriaOutput(id);

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

  getAllPostagensByIdCategoria(id: number) {
    this.listaPostagens = [];

    this.postagemService.findPostagensByIdCategoria(id).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;

      this.listaPostagens.map((postagem) => {
        // CARREGA A QTD DE POSTAGENS DO USUARIO
        this.usuarioService.findByIdUsuario(postagem.usuario.id).subscribe((respUser: Usuario) => {
          postagem.usuario = respUser;

        });

      });

    });

  }

  getByIdCategoriaOutput(id: number) {
    this.categoriaSelecionadaOutput = new Categoria();

    this.categoriaService.findByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoriaSelecionadaOutput = resp;

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

    // REALIZA O CALCULO EM MILESGUNDOS, CONVERTENDO EM DIAS

    if(Number(((Math.abs((date_1.getTime() - date_2.getTime())) / 1000) / 86400).toString().split(".")[0]) == 0) {

      return this.diffTime(`${date_1.getHours()}:${date_1.getMinutes()}`, `${date_2.getHours()}:${date_2.getMinutes()}`);
    }else {

      if(Number(((Math.abs((date_1.getTime() - date_2.getTime())) / 1000) / 86400).toString().split(".")[0]) == 1) {

        return ((Math.abs((date_1.getTime() - date_2.getTime())) / 1000) / 86400).toString().split(".")[0] +" dia";
      }

      return ((Math.abs((date_1.getTime() - date_2.getTime())) / 1000) / 86400).toString().split(".")[0] +" dias";
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

    if(window.document.URL.includes("home") && this.idPostagemSelecionada == 0 && !this.habilitaMenuCategoria && this.idCategoriaSelecionada == 0) {
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

    }else if(this.idCategoriaSelecionada > 0) {
      window.document.querySelector('section .bloco .bloco-menu #pergunta')?.setAttribute('style', 'background-color: var(--background-color-button-hover); color: var(--text-color-black-menu-hover); font-weight: bold; border-right: 3px solid var(--button-border-right-hover-color); margin-left: 0%; width: 90%;');
      window.document.querySelector('section .bloco .bloco-menu #home')?.setAttribute('style', ''); // REMOVE A CONFIGURACAO DE HOME
      window.document.querySelector('section .bloco .bloco-menu #categoria')?.setAttribute('style', '');

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
      },
      {
        descricao: "login de usuario com a geração de token"
      },
      {
        descricao: "validação de endpoints com token"
      },
      {
        descricao: "cadastro de usuario"
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
    this.idCategoriaSelecionada = 0;
    this.habilitaMenuCategoria = false;
    this.categoriaSelecionadaOutput = new Categoria();

    this.renderizaBotaoMenu(); // ATUALIZA MENU
    this.getAllPostagens(); // ATUALIZA LISTA DE POSTAGENS
    this.habilitaMenuCategoria = false;

  }

  habilitaCampoAdicionarPostagem() {
    this.isAdicionarPostagem = !this.isAdicionarPostagem;

    this.getAllCategorias();

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
    this.idCategoriaSelecionada = 0;
    this.categoriaSelecionadaOutput = new Categoria();

    this.habilitaMenuCategoria = true;

    this.renderizaBotaoMenu();

  }

  carregaImagem(nome: string, img: string) {

    if(nome == null || nome == '' || img == null || img == '') {
      return 'assets/img/person_perfil_vazio.png';
    }

    return `${this.url}/image/carregar/${nome}/${img}`;

  }

}
