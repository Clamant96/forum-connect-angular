import { Postagem } from "./Postagem";
import { Usuario } from "./Usuario";

export class Comentario {

  public id: number;
  public conteudo: string;
  public gostei: number;
  public postagem: Postagem;
  public usuario: Usuario;
  public data: Date;
}
