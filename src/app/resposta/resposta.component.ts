import { ComentarioRespostaService } from './../service/comentario-resposta.service';
import { Component, Input, OnInit } from '@angular/core';
import { Resposta } from '../model/Resposta';
import { RespostaService } from '../service/resposta.service';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { ComentarioResposta } from '../model/ComentarioResposta';
import { PostagemService } from '../service/postagem.service';
import { Postagem } from '../model/Postagem';
import { UsuarioService } from '../service/usuario.service';
import { Router } from '@angular/router';
import { Conteudo } from '../model/Conteudo';

@Component({
  selector: 'app-resposta',
  templateUrl: './resposta.component.html',
  styleUrls: ['./resposta.component.css']
})
export class RespostaComponent implements OnInit {

  @Input()
  public respostas: Resposta[] = [];

  public idUserLogado: number = environment.id;

  public comentario: ComentarioResposta = new ComentarioResposta();
  public postagem: Postagem = new Postagem();
  public usuarioResposta: Usuario = new Usuario();

  public isEditarPostagem: boolean = false;
  public isAdicionarComentarioPostagem: boolean = false;

  public memoriaConteudo: string;
  public memoriaConteudoComentario: string;

  public qtdPostagensUsuario: number = 0;

  public url: string = `${environment.server}${environment.port}`;

  public arrayConteudo: Conteudo[] = [];

  constructor(
    private respostaService: RespostaService,
    private comentarioRespostaService: ComentarioRespostaService,
    private postagemService: PostagemService,
    private usuarioService: UsuarioService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);
    }

  }

  verficarObjetoResposta(resposta: Resposta[]) {

    return resposta;
  }

  registraAvaliacaoPostagem(id: number, status: string) {
    this.respostaService.registraAvaliacao(id, status).subscribe((resp: number) => {
      this.verificaDadosResposta(id, resp);

    }, err => {
      console.log("Ocorreu um erro ao salar o gostei.");

    });

  }

  verificaDadosResposta(id: number, respGostei: number) {

    this.respostas.map((item) => {

      if(item.id == id) {
        item.gostei = respGostei;
      }

    });

  }

  habilitaCampoEdicaoPostagem(resposta: Resposta) {
    if(resposta.id == this.idUserLogado) {
      this.isEditarPostagem = !this.isEditarPostagem;
    }

    if(this.isEditarPostagem) {
      this.memoriaConteudo = resposta.conteudo;
    }else {
      this.memoriaConteudo = "";
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

  calculaQtdPostagensUsuario(usuario: Usuario) {

    try {
      if(this.usuarioResposta.id != usuario.id) {
        this.usuarioResposta = usuario;

        this.getQtdPostagensIdUsuario(usuario.id);
      }

      let qtdPostagens: number = this.qtdPostagensUsuario;

      return qtdPostagens;
    }catch { return;}

  }

  atualizarConteudoPostagem(resposta: Resposta) {
    resposta.conteudo = this.memoriaConteudo;

    this.respostaService.putConteudoResposta(resposta).subscribe((resp: boolean) => {
      this.isEditarPostagem = false; //FECHA A ABA DE EDICAO DE POSTAGEM

    }, err => {
      console.log("Ocorreu um erro ao tentar atualizar a resposta.");

    });

  }

  renderizaHR(resposta: Resposta) {

    try {
      if(resposta.comentarios.length > 0) {

        return true;
      }else {

        return false;
      }

    }catch{return false;}

  }

  registraAvaliacaoComentario(id: number, status: string, resposta: Resposta) {
    this.comentarioRespostaService.registraAvaliacao(id, status).subscribe((resp: number) => {

      resposta.comentarios.map((item) => {

        if(item.id == id) {
          item.gostei = resp;
        }

      });

    }, err => {
      console.log("Ocorreu um erro ao salvar o gostei.");

    });

  }

  habilitaCampoAdicionarComentarioPostagem(resposta: Resposta) {
    this.isAdicionarComentarioPostagem = !this.isAdicionarComentarioPostagem;

    if(this.isAdicionarComentarioPostagem) {
      this.memoriaConteudo = resposta.conteudo;
    }else {
      this.memoriaConteudo = "";
    }

  }

  publicarComentario(resposta: Resposta) {
    this.comentario = new ComentarioResposta();

    let usuarioLogado: Usuario = new Usuario();
    usuarioLogado.id = this.idUserLogado;

    let res = new Resposta();
    res.id = resposta.id;

    this.comentario.resposta = res;
    this.comentario.usuario = usuarioLogado;
    this.comentario.conteudo = this.memoriaConteudoComentario;

    this.comentarioRespostaService.postComentarioResposta(this.comentario).subscribe((resp: ComentarioResposta) => {
      this.getByIdPostagem(resposta.postagem.id); // ATUALIZA A LISTA DE RESPOSTAS

      this.isAdicionarComentarioPostagem = false; // FECHA O CAMPO DE POSTAGEM DE COMENTARIO
      this.memoriaConteudoComentario = "";

    }, err => {
      console.log("Ocorreu um erro ao tentar postar o comentario.");

      this.isAdicionarComentarioPostagem = false; // FECHA O CAMPO DE POSTAGEM DE COMENTARIO
      this.memoriaConteudoComentario = "";

    });

  }

  getByIdPostagem(id: number) {
    this.postagemService.findByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;

      // CARREGA OS DADOS DE RESPOSTA DA POSTAGEM
      this.respostaService.findAllRespostasByIdPostagem(resp.id).subscribe((respResposta: Resposta[]) => {
        this.postagem.respostas = respResposta;

        // ADICIONA O COMENTARIO NA REPOSTA ATUALIZANDO OS DADOS NA TELA
        this.respostas = respResposta;

      }, err => {
        console.log("Ocorreu um erro ao tentar carregar os comentarios da postagem.");

      });

    });

  }

  getQtdPostagensIdUsuario(id: number) {
    this.usuarioService.findByQtdPostagensIdUsuario(id).subscribe((resp: number) => {
      this.qtdPostagensUsuario = resp;
    });
  }

  carregaImagem(usuario: Usuario) {

    try {

      if(usuario.nome == null || usuario.nome == '' || usuario.img == null || usuario.img == '') {
        return 'assets/img/person_perfil_vazio.png';
      }

      return `${this.url}/image/carregar/${usuario.nome}/${usuario.img}`;

    }catch{return 'assets/img/person_perfil_vazio.png';}

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

    return this.arrayConteudo;
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

}
