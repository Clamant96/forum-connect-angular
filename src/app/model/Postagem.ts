import { Categoria } from "./Categoria";
import { Comentario } from "./Comentario";
import { Resposta } from "./Resposta";
import { Usuario } from "./Usuario";

export class Postagem {

	public id: number;
	public titulo: string;
	public conteudo: string;
	public categoria: Categoria;
	public gostei: number;
	public comentarios: Comentario[];
	public respostas: Resposta[];
	public usuario: Usuario;

}
