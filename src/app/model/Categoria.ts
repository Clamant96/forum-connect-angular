import { Postagem } from "./Postagem";

export class Categoria {

  public id: number;
  public nome: string;
  public cor: string;
  public postagens: Postagem[];
  public descricao: string;

}
