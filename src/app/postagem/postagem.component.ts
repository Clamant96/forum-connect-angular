import { RespostaService } from './../service/resposta.service';
import { ComentarioService } from './../service/comentario.service';
import { PostagemService } from './../service/postagem.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { Usuario } from '../model/Usuario';
import { Categoria } from '../model/Categoria';
import { environment } from 'src/environments/environment.prod';
import { UsuarioService } from '../service/usuario.service';
import { Comentario } from '../model/Comentario';
import { Resposta } from '../model/Resposta';
import { Markdown } from '../model/Markdown';
import { Conteudo } from '../model/Conteudo';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  @Input()
  public id: number = 0;

  // public id: number = 0;
  public idUserLogado: number = environment.id;
  public nome: string = environment.nome;

  public postagem: Postagem = new Postagem();
  public usuario: Usuario = new Usuario();
  public comentario: Comentario = new Comentario();
  public resposta: Resposta = new Resposta();

  public isEditarPostagem: boolean = false;
  public isAdicionarComentarioPostagem: boolean = false;

  public memoriaConteudo: string;
  public memoriaConteudoComentario: string;
  public memoriaConteudoResposta: string;

  public markdown: string = "";

  public url: string = `${environment.server}${environment.port}`;

  public arrayConteudo: Conteudo[] = [];

  constructor(
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private usuarioService: UsuarioService,
    private comentarioService: ComentarioService,
    private respostaService: RespostaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);
    }

    //* RECEBE O NOVO ID DE ACORDO COM A OPCAO ESCOLHIDA PELO USUARIO AO ATUALIZAR O DADO DE TEMA */
    // this.id = this.route.snapshot.params['id'];

    this.getByIdPostagem(this.id);
    this.registraVisualizacaoPostagem(this.id);

  }

  getByIdPostagem(id: number) {
    this.postagemService.findByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

      this.ajustaMarkdownPostagem(this.postagem.conteudo);

      // CARREGA A QTD DE POSTAGENS DO USUARIO
      this.usuarioService.findByIdUsuario(resp.usuario.id).subscribe((respUser: Usuario) => {
        this.postagem.usuario = respUser;

      });

      // CARREGA OS DADOS DE RESPOSTA DA POSTAGEM
      this.respostaService.findAllRespostasByIdPostagem(resp.id).subscribe((respResposta: Resposta[]) => {
        this.postagem.respostas = respResposta;

      }, err => {
        console.log("Ocorreu um erro ao tentar carregar os comentarios da postagem.");

      });

    });

  }

  ajustaMarkdownPostagem(dado: string) {
    this.arrayConteudo = [];

    let memoria: string[] = dado.split("\n");
      let cont: number = 0;

      let conteudo: Conteudo = new Conteudo();

      memoria.map((item) => {

        conteudo.id = cont;

        if(item.includes("\t")) {
          conteudo.descricao = `[TAB]${item}`;

        }else {
          conteudo.descricao = item;

        }

        this.arrayConteudo.push(conteudo);

        cont++;

        conteudo = new Conteudo();

      });

  }

  ajustaMarkdownPostagemComentario(dado: string) {
    let retorno: Conteudo[] = [];

    let memoria: string[] = dado.split("\n");
      let cont: number = 0;

      let conteudo: Conteudo = new Conteudo();

      memoria.map((item) => {

        conteudo.id = cont;

        if(item.includes("\t")) {
          conteudo.descricao = `[TAB]${item}`;

        }else {
          conteudo.descricao = item;

        }

        retorno.push(conteudo);

        cont++;

        conteudo = new Conteudo();

      });

    return retorno;
  }

  renderizadorTab(dado: string) {

    let retorno: string = "";

    retorno = dado.split("[TAB]")[1];

    if(retorno == "\t") {
      retorno = "";
    }

    return retorno;
  }

  verificaTab(dado: string) {
    return dado.includes("[TAB]");
  }

  verificaTabDobrado(dado: string) {
    return dado.includes("[TAB]\t\t");
  }

  verificaDadoVazio(dado: string) {

    let retorno: boolean = false;

    if(dado.split("[TAB]")[1] == "\t") {
      retorno = true;

    }

    return retorno;
  }

  registraVisualizacaoPostagem(id: number) {
    this.postagemService.registraVisualizacao(id).subscribe((resp: boolean) => {
      // console.log("Visualizacao salva!");

    }, err => {
      console.log("Ocorreu um erro ao salvar a visualizacao.");

    });

  }

  registraAvaliacaoPostagem(id: number, status: string) {
    this.postagemService.registraAvaliacao(id, status).subscribe((resp: number) => {
      this.postagem.gostei = resp;

    }, err => {
      console.log("Ocorreu um erro ao salar o gostei.");

    });

  }

  registraAvaliacaoComentario(id: number, status: string) {
    this.comentarioService.registraAvaliacao(id, status).subscribe((resp: number) => {

      this.postagem.comentarios.map((item) => {

        if(item.id == id) {
          item.gostei = resp;
        }

      });

    }, err => {
      console.log("Ocorreu um erro ao salar o gostei.");

    });

  }

  atualizarConteudoPostagem() {
    this.postagem.conteudo = this.memoriaConteudo;

    this.postagemService.putConteudoPostagem(this.postagem).subscribe((resp: boolean) => {
      this.isEditarPostagem = false; //FECHA A ABA DE EDICAO DE POSTAGEM

      this.ajustaMarkdownPostagem(this.postagem.conteudo);

    }, err => {
      console.log("Ocorreu um erro ao tentar atualizar a postagem.");

    });

  }

  publicarComentario(postagem: Postagem) {
    this.comentario = new Comentario();

    let usuarioLogado: Usuario = new Usuario();
    usuarioLogado.id = this.idUserLogado;

    let post = new Postagem();
    post.id = postagem.id;

    this.comentario.postagem = post;
    this.comentario.usuario = usuarioLogado;
    this.comentario.conteudo = this.memoriaConteudoComentario;

    console.log("this.comentario");
    console.log(this.comentario);

    this.comentarioService.postComentario(this.comentario).subscribe((resp: Comentario) => {
      this.getByIdPostagem(postagem.id);

      this.isAdicionarComentarioPostagem = false; // FECHA O CAMPO DE POSTAGEM DE COMENTARIO
      this.memoriaConteudoComentario = "";

    }, err => {
      console.log("Ocorreu um erro ao tentar postar o comentario.");

      this.isAdicionarComentarioPostagem = false; // FECHA O CAMPO DE POSTAGEM DE COMENTARIO
      this.memoriaConteudoComentario = "";

    });

  }

  publicarResposta(postagem: Postagem) {
    this.resposta = new Resposta();

    let usuarioLogado: Usuario = new Usuario();
    usuarioLogado.id = this.idUserLogado;

    let post = new Postagem();
    post.id = postagem.id;

    this.resposta.postagem = post;
    this.resposta.usuario = usuarioLogado;
    // this.resposta.conteudo = this.memoriaConteudoResposta.replace('\n\t', '').replace('\n\t\t', '').replace('\n', '').replace('\t', '');
    // this.resposta.titulo = this.memoriaConteudoResposta.replace('\n\t', '').replace('\n\t\t', '').replace('\n', '').replace('\t', '');
    this.resposta.conteudo = this.memoriaConteudoResposta;
    this.resposta.titulo = this.memoriaConteudoResposta;

    this.respostaService.postResposta(this.resposta).subscribe((resp: Resposta) => {
      this.getByIdPostagem(postagem.id);

      this.memoriaConteudoResposta = "";

    }, err => {
      console.log("Ocorreu um erro ao tentar postar a resposta.");

      this.memoriaConteudoResposta = "";

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

  habilitaCampoEdicaoPostagem() {
    if(this.postagem.usuario.id == this.idUserLogado) {
      this.isEditarPostagem = !this.isEditarPostagem;
    }

    if(this.isEditarPostagem) {
      this.memoriaConteudo = this.postagem.conteudo;
    }else {
      this.memoriaConteudo = "";
    }

  }

  renderizaHR(postagem: Postagem) {

    try {
      if(postagem.comentarios.length > 0) {

        return true;
      }else {

        return false;
      }

    }catch{return false;}

  }

  habilitaCampoAdicionarComentarioPostagem() {
    this.isAdicionarComentarioPostagem = !this.isAdicionarComentarioPostagem;

    if(this.isAdicionarComentarioPostagem) {
      this.memoriaConteudo = this.postagem.conteudo;
    }else {
      this.memoriaConteudo = "";
    }

  }

  renderizaTexto(conteudo: string) {
    conteudo = conteudo.replace('\n\t\t', '[ntt]').replace('\n\t', '[nt]').replace('\n', '[n]').replace('\t', '[t]');

    return conteudo;
  }

  renderizaMarkdown(conteudo: string) {
    let dados: Markdown[] = [];

    conteudo.split('```').map((item) => {

      let markdown: Markdown = new Markdown();

      if(item.includes('java')) {
        markdown.tipo = "codigo";
        markdown.conteudo = item;

      }else {
        markdown.tipo = "texto";
        markdown.conteudo = item;

      }

      dados.push(markdown);

    });

    console.log(dados);

    return dados;
  }

  carregaImagem(usuario: Usuario) {

    try {
      if(usuario.nome == null || usuario.nome == '' || usuario.img == null || usuario.img == '') {
        return 'assets/img/person_perfil_vazio.png';
      }

      return `${this.url}/image/carregar/${usuario.nome}/${usuario.img}`;

    }catch{return 'assets/img/person_perfil_vazio.png';}

  }
}
