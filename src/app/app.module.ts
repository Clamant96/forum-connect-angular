import {HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PostagemComponent } from './postagem/postagem.component';
import { RespostaComponent } from './resposta/resposta.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ImageComponent } from './upload/image/image.component';
import { PerfilComponent } from './editar/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostagemComponent,
    RespostaComponent,
    HeaderComponent,
    LoginComponent,
    CategoriaComponent,
    ImageComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
