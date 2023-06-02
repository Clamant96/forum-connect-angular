import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../service/categoria.service';
import { Categoria } from '../model/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  public listaCategorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {
    window.scroll(0, 0);

    this.getAllCategorias();

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

}