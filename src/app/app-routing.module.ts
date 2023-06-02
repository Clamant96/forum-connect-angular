import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostagemComponent } from './postagem/postagem.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  /* ACESSO VAZIO */
  {
    path: '',
    //redirectTo: 'login',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  /* ============  */
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'postagem/:id', component: PostagemComponent
  },
  {
    path: 'categoria', component: CategoriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
