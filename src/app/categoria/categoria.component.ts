import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  @Output() idCategoriaEvent = new EventEmitter<number>();

  public listaCategorias: Categoria[] = [];

  public categoria: Categoria = new Categoria();
  public editarCategoria: Categoria = new Categoria();

  public isCadastrarCategoria: boolean = false;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    if(environment.token == '') {
      this.router.navigate(['/login']);
    }

    this.getAllCategorias();

  }

  pushIdCategoria(id: number) {
    this.idCategoriaEvent.emit(id);

  }

  getAllCategorias() {
    this.categoriaService.findAllCategorias().subscribe((resp: Categoria[]) => {

      resp.map((item) => {
        item.cor = `background-color: ${item.cor};`;

      });

      this.listaCategorias = resp;

    });

  }

  renderizaTotalDePerguntas(categoria: Categoria) {
    try {

      let total: number = categoria.postagens.length;

      return total;
    }catch{return;}
  }

  capturaIdDaCategoriaSelecionada(categoria: Categoria) {
    this.pushIdCategoria(categoria.id);

  }

  postCategoria() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {

      this.getAllCategorias();
      this.habilitarCadastrarCategoria(false);

      this.categoria = new Categoria();

    }, err => {

      console.log('Ocorreu um erro ao tentar cadastrar a categoria.');

    });

  }

  habilitarCadastrarCategoria(status: boolean) {
    this.isCadastrarCategoria = status;
  }

  habilitaEditarCategoria(categoria: Categoria) {
    this.editarCategoria = categoria;

  }

  putCategoria() {
    this.categoriaService.putCategoria(this.editarCategoria).subscribe((resp: Categoria) => {
      this.editarCategoria = new Categoria();

    }, err => {
      console.log('Ocorreu um erro ao tentar atualizar a categoria.');

    });

  }

}
