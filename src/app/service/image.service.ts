import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public serverPort: string = `${environment.server}${environment.port}`

  constructor(
    private http: HttpClient

  ) { }

  header(metodo: string) {

    var reqHeader = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': metodo,
      'Access-Control-Allow-Origin': '*',
      'Authorization': environment.token
    });

    return { headers: reqHeader };
  }

  uploadImage(image: File): Observable<boolean> {
    const data: FormData = new FormData();

    data.append('type', image.type);
    data.append('file', image);
    data.append('contentType', image);
    data.append('empty', String(false));
    data.append('name', `${environment.nome}/${image.name}`);
    data.append('originalFilename', `${environment.nome}/${image.name}`);
    data.append('size', String(image.size));

    let nomeArquivo: string = String(this.getRandomInt(100000000, 999999999));

    environment.nomeUplaodImagem = `${nomeArquivo}.${image.name.split(".")[1]}`;

    return this.http.post<boolean>(`${this.serverPort}/upload/${environment.nome}/nomeArquivo/${nomeArquivo}`, data, this.header("POST"));
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  loadImage(nomeUsuario: string, nomeImg: string) {

    return this.http.get(`${this.serverPort}/image/carregar/${nomeUsuario}/${nomeImg}`, this.header("GET"));
  }

}
