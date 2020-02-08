import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-listar-pokemons',
  templateUrl: './listar-pokemons.component.html',
  styleUrls: ['./listar-pokemons.component.css']
})
export class ListarPokemonsComponent implements OnInit {

  pokemons: any;
  results: any [];
  next: string;
  previous: string;
  urlPokeApi: string = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
  pokemonsFavoritos = new Array();

  constructor(private service: PokemonService) { }

  ngOnInit() {
    this.service.listarPokemons(this.urlPokeApi).subscribe(
      dados => {
        this.pokemons = dados;
        this.next = this.pokemons.next;
        this.previous = this.pokemons.previous;
        this.pokemons = this.pokemons.results;
      } 
      );
  }

  nextPage(){
    if(!this.next){
      alert('Não existem mais pokemons para serem exibidos');
      return;
    }
    this.service.listarPokemons(this.next).subscribe(
      dados => {
        this.pokemons = dados;
        this.next = this.pokemons.next;
        this.previous = this.pokemons.previous;
        this.pokemons = this.pokemons.results;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    )
  }

  previousPage(){
    if(!this.previous){
      alert('Vocês está na primeira página');
      return;
    }
    this.service.listarPokemons(this.previous).subscribe(
      dados => {
        this.pokemons = dados;
        this.next = this.pokemons.next;
        this.previous = this.pokemons.previous;
        this.pokemons = this.pokemons.results;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    )
  }

  favoritar(name){
    let dados = {
      name: name
    };

    this.pokemonsFavoritos.push(name);

    localStorage.setItem('pokemonsFavoritos', JSON.stringify(this.pokemonsFavoritos));

    alert('Pokemon: ' + name + " salvo no favoritos com sucesso !");
    
    console.log(localStorage.getItem('pokemonsFavoritos'));
  }

}
