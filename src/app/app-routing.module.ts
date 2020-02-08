import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarPokemonsComponent } from './listar-pokemons/listar-pokemons.component';

const routes: Routes = [{
  path: 'listarPokemons', component: ListarPokemonsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
