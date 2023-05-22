import { Comentario } from "./Comentario";
import { ComentarioResposta } from "./ComentarioResposta";
import { Postagem } from "./Postagem";
import { Resposta } from "./Resposta";

export class Usuario {

  public id: number;
  public nome: string;
  public senha: string;
  public email: string;
  public img: string;
  public postagens: Postagem[];
  public respostas: Resposta[];
  public comentarios: Comentario[];
  public comentariosRespostas: ComentarioResposta[];

}
