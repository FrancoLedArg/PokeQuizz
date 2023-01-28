// Types

interface Props {
  params: {
    id: number
  }
}

// Fetching Data
const fetchPokemon = (id: number) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
}


const PokemonID = async ({params}: Props) => {
  const { id } = params

  const pokemon = await fetchPokemon(id)

  return (
    <div className="Pokemon">
      <h1>Este Pokemon es:</h1>
      <br />
      <h1 className="Data">
      {pokemon.name}
      </h1>
    </div>
  )
}

export default PokemonID
