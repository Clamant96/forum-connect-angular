import { Resposta } from "./Resposta";
import { Usuario } from "./Usuario";

export class ComentarioResposta {

  public id: number;
  public conteudo: string;
  public gostei: number;
  public resposta: Resposta;
  public usuario: Usuario;
  public data: Date;

}
