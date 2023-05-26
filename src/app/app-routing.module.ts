import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostagemComponent } from './postagem/postagem.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
