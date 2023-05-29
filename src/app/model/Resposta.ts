import { ComentarioResposta } from "./ComentarioResposta";
import { Postagem } from "./Postagem";
import { Usuario } from "./Usuario";

export class Resposta {

  public id: number;
  public titulo: string;
  public conteudo: string;
  public gostei: number;
  public postagem: Postagem;
  public comentarios: ComentarioResposta[];
  public usuario: Usuario;
  public data: Date;

}
