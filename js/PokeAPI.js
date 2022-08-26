export class PokeAPI {
    static getPokemon(pokemon) {
        const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        
        return fetch(endpoint)
            .then(pokedata => pokedata.json())
            .then(({name, id, sprites}) => ({
                name,
                id,
                sprites,
            }))    
    }
}