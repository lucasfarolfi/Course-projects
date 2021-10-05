<template>
  <div id="app">
    <div class="column is-half is-offset-one-quarter">
      <img src="./assets/Pokemon-Logo.png" alt="Pokemon logo">
      <hr>
      <h4 class="is-size-4">Pokedex</h4>
      <input class="input is-primary mgb-small" type="text" placeholder="Pesquisar pokemon" v-model="search">
      <button class="button is-fullwidth is-success" @click="searchPokemon">Pesquisar</button>
      <div v-for="(poke, index) in filteredPokemons" :key="poke.url">
        <Pokemon :index="index+1" :name="poke.name" :url="poke.url" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Pokemon from './components/Pokemon.vue' //Pokemon componente
  export default {
    name: 'App',
    components:{
      Pokemon
    },
    data(){
      return{
        pokemons: [], //Array com todos os pokemons
        filteredPokemons: [], //Array filtrando todos os pokemons
        search: ''
      }
    },
    created: function(){
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0").then((res)=>{
        
        this.pokemons = res.data.results //Passa todos os pokemons para o array de pokemons do data()
        this.filteredPokemons = res.data.results //Passa todos os pokemons para a exibição
        //console.log(this.pokemons)
      }).catch(err=>{
        console.log(err)
      })
    },
    methods:{
      searchPokemon: function (){
        this.filteredPokemons = this.pokemons
        if(this.search == '' || this.search == ' '){
          this.filteredPokemons = this.pokemons
        }
        else{
          this.filteredPokemons = this.pokemons.filter(pokemon=> pokemon.name == this.search)
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
