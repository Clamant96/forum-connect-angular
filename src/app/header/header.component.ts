import { ImageService } from 'src/app/service/image.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public nome: string = environment.nome;
  public img: string = environment.img;
  public id: number = environment.id;
  public url: string = `${environment.server}${environment.port}`;


  constructor(
  ) { }

  ngOnInit() {

  }

  carregaImagem(nome: string, img: string) {

    if(nome == null || nome == '' || img == null || img == '') {
      return 'assets/img/person_perfil_vazio.png';
    }

    return `${this.url}/image/carregar/${nome}/${img}`;

  }

}
