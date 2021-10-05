<template>
    <div class="pokemon">
        <div class="card">
            <div class="card-image">
                <figure>
                <img :src="currentImg" alt="Pokemon image">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">
                <div class="media-content">
                    <p class="title is-4">{{index}} - {{name | upper}}</p>
                    <p class="subtitle is-6">Tipo: {{pokemon.type}}</p>
                    <button @click="changeSprite()" class="button is-medium is-fullwidth">Mudar foto</button>
                </div>
                </div>

                <div class="content">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {

        props:{
            index: Number,
            name: String,
            url: String
        },
        filters:{
            upper: function(value){ //Deixa a primeira letra maiúscula
                return value[0].toUpperCase() + value.slice(1)
            }
        },
        data(){
            return{
                isFront: true, //Verifica se a foto é de frente ou não
                currentImg: '', //Recebe o sprite para exibir
                pokemon: {
                    type: '',
                    sprite_front: '',
                    sprite_back: ''
                }
            }
        },
        created: function(){
            axios.get(this.url).then(res=>{ //Faz uma requisição à rota do pokemon recebida na prop
                this.pokemon.type = res.data.types[0].type.name //Pèga o tipo
                this.pokemon.sprite_front = res.data.sprites.front_default //Pega a imagem de frente
                this.pokemon.sprite_back = res.data.sprites.back_default //Pega a imagem de costas
                this.currentImg = this.pokemon.sprite_front //Recebe a imagem da frente
                //console.log(this.pokemon)
            })
        },
        methods:{
            changeSprite: function(){ //Função de click que troca o sprite
                if(this.isFront){ //Se for a foto de frente, trocar para a foto de costas
                    this.isFront = false
                    this.currentImg = this.pokemon.sprite_back
                }
                else{ //Se for a foto de costas, trocar para a foto de frente
                    this.isFront = true
                    this.currentImg = this.pokemon.sprite_front
                }
            }
        }
    }
</script>

<style scoped>
    .pokemon{
        margin-bottom: 2%;
    }
</style>