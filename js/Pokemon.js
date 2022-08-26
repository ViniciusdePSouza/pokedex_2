import { PokeAPI } from "./PokeAPI.js";

export class Pokemon {
    constructor(root) {
        this.root = document.querySelector(root);
        this.displayManagement()
        this.getPokemon()
        this.renderPokemon(currentPokeId)
        this.initApp()
    }

    displayManagement() {
        const prevButton = this.root.querySelector('.btn-prev')
        const nextButton = this.root.querySelector('.btn-next')

        prevButton.addEventListener('click', () => {
            if (currentPokeId > 1) {
                currentPokeId--
            }

            renderPokemon(currentPokeId)
        })

        nextButton.addEventListener('click', () => {
            currentPokeId++
            renderPokemon(currentPokeId)
        })
    }
    async renderPokemon(pokemon) {
        const pokeID = this.root.querySelector('.pokemon-id')
        const pokeName = this.root.querySelector('.pokemon-name')
        const pokeGif = this.root.querySelector('.pokemon-gif')

        const currentPokemon = await PokeAPI.getPokemon(pokemon)

        pokeID.innerHTML = currentPokemon.id
        pokeName.innerHTML = currentPokemon.name
        pokeGif.src = currentPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
    }

    getPokemon() {
        const form = document.querySelector('.form')
        const input = this.root.querySelector('#search')

        form.addEventListener('submit', (event) => {
            event.preventDefault()

            this.renderPokemon(input.value.toLowerCase())

            input.value = ''
        })
    }
}