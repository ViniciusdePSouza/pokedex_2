import { PokeAPI } from "./PokeAPI.js";
// import { Pokemon } from "./Pokemon.js";

// const initApp = new Pokemon('#app')
const nextButton = document.querySelector('.btn-next')
const prevButton = document.querySelector('.btn-prev')

const pokeID = document.querySelector('.pokemon-id')
const pokeName = document.querySelector('.pokemon-name')
const pokeGif = document.querySelector('.pokemon-gif')
const form = document.querySelector('.form')
const input = document.querySelector('#search')

let currentPokeId = 1


async function renderPokemon(pokemon) {

    pokeName.innerHTML = 'Loading...'
    pokeID.innerHTML = ''

    const currentPokemon = await PokeAPI.getPokemon(pokemon)

    if  (currentPokemon.id){
        pokeName.innerHTML = currentPokemon.name
        pokeID.innerHTML = currentPokemon.id
        pokeGif.src = currentPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    
        currentPokeId = currentPokemon.id
    
        if (currentPokeId == 1) {
            prevButton.disabled = true
        } else {
            prevButton.removeAttribute('disabled')
        }
        if (currentPokeId == 905) {
            nextButton.disabled = true
        } else {
            nextButton.removeAttribute('disabled')
        }
    } else {
        pokeName.innerHTML = 'Pokémon not found'
        pokeGif.src = 'https://media1.giphy.com/media/PhZ4hE8XVEoOkWA4db/giphy.gif?cid=790b761150ffb43c6b9f49cfc016af350f02f7ca67884ea2&rid=giphy.gif&ct=s'
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())

    input.value = ''
})

nextButton.addEventListener('click', () => {
    currentPokeId++
    renderPokemon(currentPokeId)
})

prevButton.addEventListener('click', () => {
    if (currentPokeId > 1) {
        currentPokeId--
    }

    renderPokemon(currentPokeId)
})

renderPokemon(currentPokeId)