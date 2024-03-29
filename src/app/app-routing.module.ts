import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostagemComponent } from './postagem/postagem.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { LoginComponent } from './login/login.component';
import { PerfilComponent } from './editar/perfil/perfil.component';

const routes: Routes = [
  /* ACESSO VAZIO */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  /* ============  */
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'postagem/:id', component: PostagemComponent
  },
  {
    path: 'categoria', component: CategoriaComponent
  },
  {
    path: 'editar-perfil/:id', component: PerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
